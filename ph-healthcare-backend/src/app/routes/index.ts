import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";
import { doctorRoutes } from "../module/doctor/doctor.route";
import { userRoutes } from "../module/user/user.route";
import { adminRoutes } from "../module/admin/admin.route";
import { scheduleRoutes } from "../module/schedulre/schedule.route";
import { doctorScheduleRoutes } from "../module/doctorSchedule/doctorSchedule.route";
import { paymentRoutes } from "../module/payment/payment.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/specialties", specialtyRoutes);
router.use("/doctor", doctorRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/doctorSchedule", doctorScheduleRoutes);
router.use("/payment", paymentRoutes);

export const IndexRoutes = router;
