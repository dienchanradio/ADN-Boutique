import path from "path";
import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import { publishableKeyFromHost } from "@clerk/shared/keys";
import {
  CLERK_PROXY_PATH,
  clerkProxyMiddleware,
  getClerkProxyHost,
} from "./middlewares/clerkProxyMiddleware";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);

// Publish may probe the process root even when the artifact startup health path
// is configured as /api/healthz. Keep this endpoint independent of auth and
// external services so a healthy process always returns HTTP 200.

app.use(CLERK_PROXY_PATH, clerkProxyMiddleware());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  clerkMiddleware((req) => ({
    publishableKey: publishableKeyFromHost(
      getClerkProxyHost(req) ?? "",
      process.env.CLERK_PUBLISHABLE_KEY,
    ),
  })),
);

app.use("/api", router);
// Cấu hình đường dẫn tới thư mục Frontend vừa build
// (Nếu Vite của bạn xuất file ra thư mục public, hãy thêm "/public" vào sau "dist")
const frontendPath = path.join(process.cwd(), "artifacts/dien-chan-adn/dist/public");

// Phục vụ các file tĩnh (CSS, JS, Hình ảnh...)
app.use(express.static(frontendPath));

// Bắt mọi đường link (ngoại trừ /api) và trả về giao diện web
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});
export default app;
