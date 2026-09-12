import { Router, type IRouter } from "express";
import { requireAdmin } from "../lib/adminAuth";
import { createUpload, getObject, pipeObject } from "../lib/objectStorage";

const router: IRouter = Router();

router.post("/admin/uploads/request-url", requireAdmin, async (req, res): Promise<void> => {
  const { name, size, contentType } = req.body ?? {};
  if (typeof name !== "string" || typeof size !== "number" || size <= 0 || typeof contentType !== "string" || !contentType.startsWith("image/")) {
    res.status(400).json({ error: "Chỉ hỗ trợ tệp hình ảnh hợp lệ." });
    return;
  }
  if (size > 10 * 1024 * 1024) {
    res.status(413).json({ error: "Ảnh không được vượt quá 10MB." });
    return;
  }
  try {
    res.json({ ...(await createUpload()), metadata: { name, size, contentType } });
  } catch (error) {
    req.log.error({ err: error }, "Admin image upload URL failed");
    res.status(500).json({ error: "Không thể chuẩn bị tải ảnh lên. Vui lòng thử lại." });
  }
});

router.get("/storage/objects/*path", async (req, res): Promise<void> => {
  const rawPath = req.params.path;
  const objectPath = `/objects/${Array.isArray(rawPath) ? rawPath.join("/") : rawPath}`;
  try {
    const file = await getObject(objectPath);
    if (!file) {
      res.status(404).json({ error: "Không tìm thấy hình ảnh." });
      return;
    }
    await pipeObject(file, res);
  } catch (error) {
    req.log.error({ err: error }, "Object serving failed");
    res.status(500).json({ error: "Không thể tải hình ảnh." });
  }
});

export default router;