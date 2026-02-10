import { Router } from "express";
import { specialtyRoute } from "../module/specialty/specialty.route";
import { authRouter } from "../module/auth/auth.route";
import { doctorRoutes } from "../module/doctor/doctor.route";
import { userRoute } from "../module/user/user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/specialties", specialtyRoute);
router.use("/doctor", doctorRoutes);
router.use("/user", userRoute);

export const IndexRoutes = router;
