import express from "express";
import authRoutes from "./auth/auth.routes.js";
import { authCheck } from "../middleware/authMiddleware.js";
import profileRoutes from "./profile/profile.routes.js";
import { routesErr } from "../middleware/errorMiddleware.js";
const router = express.Router();

router.use(authRoutes);
router.use("/profile", authCheck, profileRoutes);

router.use(routesErr);

export default router;
