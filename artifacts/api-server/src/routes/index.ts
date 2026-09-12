import { Router, type IRouter } from "express";
import healthRouter from "./health";
import registrationsRouter from "./registrations";
import adminAuthRouter from "./admin-auth";
import postsRouter from "./posts";
import storageRouter from "./storage";

const router: IRouter = Router();

router.use(healthRouter);
router.use(registrationsRouter);
router.use(adminAuthRouter);
router.use(postsRouter);
router.use(storageRouter);

export default router;
