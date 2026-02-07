import { Router } from "express";
import { specialtyRoute } from "../module/specialty/specialty.route";
import { authRouter } from "../module/auth/auth.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/specialties", specialtyRoute);

export const IndexRoutes = router;
