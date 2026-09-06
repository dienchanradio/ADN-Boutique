import { Router, type IRouter, type RequestHandler } from "express";
import { desc, eq, sql } from "drizzle-orm";
import { getAuth } from "@clerk/express";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { db, courseRegistrationsTable } from "@workspace/db";
import {
  CreateRegistrationBody,
  CreateRegistrationResponse,
  ListAdminOrdersQueryParams,
  ListAdminOrdersResponse,
  ReviewAdminOrderBody,
  ReviewAdminOrderParams,
  ReviewAdminOrderResponse,
  GetAdminSummaryResponse,
  LoginStudentBody,
  LoginStudentResponse,
  RequestPasswordResetBody,
  RequestPasswordResetResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();
const COURSE_PRICE = 875_000;
const GOOGLE_SHEET_ID = "1cnsi0hejLAF7VCZOfQr7Y6ZXiJSRlUitqm2ffhcZgsk";

async function appendRegistrationToSheet(
  fullName: string,
  phone: string,
  email: string,
  registrationUrl: string,
): Promise<Response> {
  const connectors = new ReplitConnectors();
  const metadataResponse = await connectors.proxy(
    "google-sheet",
    `/v4/spreadsheets/${GOOGLE_SHEET_ID}?fields=sheets.properties`,
    { method: "GET" },
  );

  if (!metadataResponse.ok) return metadataResponse;

  const metadata = (await metadataResponse.json()) as {
    sheets?: Array<{ properties?: { title?: string } }>;
  };
  const sheetTitle = metadata.sheets?.[0]?.properties?.title;
  if (!sheetTitle) throw new Error("Google Sheet chưa có trang tính để ghi dữ liệu.");

  const encodedRange = encodeURIComponent(`'${sheetTitle.replace(/'/g, "''")}'!A:C`);
  return connectors.proxy(
    "google-sheet",
    `/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${encodedRange}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ values: [[fullName, phone, email, registrationUrl]] }),
    },
  );
}

const requireAdmin: RequestHandler = (req, res, next) => {
  const auth = getAuth(req);
  const userId = "userId" in auth ? auth.userId : undefined;
  if (!userId) {
    res.status(401).json({ error: "Vui lòng đăng nhập để tiếp tục." });
    return;
  }
  next();
};

router.post("/registrations", async (req, res): Promise<void> => {
  const parsed = CreateRegistrationBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ errors: parsed.error.flatten() }, "Invalid course registration");
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const existing = await db
    .select({ id: courseRegistrationsTable.id })
    .from(courseRegistrationsTable)
    .where(eq(courseRegistrationsTable.email, parsed.data.email))
    .limit(1);

  if (existing.length > 0) {
    res.status(400).json({ error: "Email này đã được đăng ký. Vui lòng kiểm tra lại email hoặc liên hệ hỗ trợ." });
    return;
  }

  try {
    const sheetResponse = await appendRegistrationToSheet(
      parsed.data.fullName,
      parsed.data.phone,
      parsed.data.email,
      parsed.data.registrationUrl,
    );
    if (!sheetResponse.ok) {
      req.log.error({ status: sheetResponse.status }, "Google Sheet rejected course registration");
      res.status(502).json({ error: "Không thể ghi thông tin vào Google Sheet. Vui lòng kiểm tra quyền truy cập bảng tính." });
      return;
    }
  } catch (error) {
    req.log.error({ err: error }, "Google Sheet registration forwarding failed");
    res.status(502).json({ error: "Không thể kết nối Google Sheet lúc này. Vui lòng thử lại sau." });
    return;
  }

  const [registration] = await db
    .insert(courseRegistrationsTable)
    .values({
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email.toLowerCase(),
      receiptUrl: "",
      consent: false,
    })
    .returning();

  req.log.info({ registrationId: registration.id }, "Course registration created");
  res.status(201).json(
    CreateRegistrationResponse.parse({
      ...registration,
      createdAt: registration.createdAt,
    }),
  );
});

router.post("/auth/login", async (req, res): Promise<void> => {
  const parsed = LoginStudentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  res.status(401).json({
    error: "Vui lòng sử dụng trang đăng nhập học viên để xác thực an toàn.",
  });
});

router.post("/auth/forgot-password", async (req, res): Promise<void> => {
  const parsed = RequestPasswordResetBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const result = RequestPasswordResetResponse.parse({
    message: "Nếu email tồn tại, hướng dẫn đặt lại mật khẩu sẽ được gửi đến bạn.",
  });
  res.json(result);
});

router.get("/admin/orders", requireAdmin, async (req, res): Promise<void> => {
  const parsed = ListAdminOrdersQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const rows = await db
    .select()
    .from(courseRegistrationsTable)
    .orderBy(desc(courseRegistrationsTable.createdAt));
  const filtered = parsed.data.status === "all"
    ? rows
    : rows.filter((row) => row.status === parsed.data.status);

  res.json(ListAdminOrdersResponse.parse(filtered));
});

router.patch("/admin/orders/:id/review", requireAdmin, async (req, res): Promise<void> => {
  const params = ReviewAdminOrderParams.safeParse(req.params);
  const body = ReviewAdminOrderBody.safeParse(req.body);

  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [updated] = await db
    .update(courseRegistrationsTable)
    .set({
      status: body.data.decision === "approve" ? "paid" : "rejected",
      accountStatus: body.data.decision === "approve" ? "active" : "pending",
      rejectionReason: body.data.decision === "reject" ? body.data.reason ?? null : null,
      reviewedAt: new Date(),
    })
    .where(eq(courseRegistrationsTable.id, params.data.id))
    .returning();

  if (!updated) {
    res.status(404).json({ error: "Không tìm thấy đơn đăng ký." });
    return;
  }

  req.log.info({ registrationId: updated.id, decision: body.data.decision }, "Registration reviewed");
  res.json(ReviewAdminOrderResponse.parse(updated));
});

router.get("/admin/summary", requireAdmin, async (_req, res): Promise<void> => {
  const [summary] = await db
    .select({
      totalRegistrations: sql<number>`count(*)::int`,
      pendingOrders: sql<number>`count(*) filter (where ${courseRegistrationsTable.status} = 'pending')::int`,
      approvedOrders: sql<number>`count(*) filter (where ${courseRegistrationsTable.status} = 'paid')::int`,
    })
    .from(courseRegistrationsTable);

  res.json(
    GetAdminSummaryResponse.parse({
      totalRegistrations: summary?.totalRegistrations ?? 0,
      pendingOrders: summary?.pendingOrders ?? 0,
      approvedOrders: summary?.approvedOrders ?? 0,
      totalRevenue: (summary?.approvedOrders ?? 0) * COURSE_PRICE,
    }),
  );
});

export default router;