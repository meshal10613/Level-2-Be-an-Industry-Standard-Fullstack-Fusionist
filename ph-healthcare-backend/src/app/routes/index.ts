import { Router } from "express";
import { specialtyRoutes } from "../module/specialty/specialty.route";
import { authRoutes } from "../module/auth/auth.route";
import { doctorRoutes } from "../module/doctor/doctor.route";
import { userRoutes } from "../module/user/user.route";
import { adminRoutes } from "../module/admin/admin.route";
import { scheduleRoutes } from "../module/schedulre/schedule.route";
import { doctorScheduleRoutes } from "../module/doctorSchedule/doctorSchedule.route";
import { paymentRoutes } from "../module/payment/payment.route";
import { appointmentRoutes } from "../module/appointment/appointment.route";
import { patientRoutes } from "../module/patient/patient.route";
import { reviewRoutes } from "../module/review/review.route";
import { prescriptionRoutes } from "../module/prescription/prescription.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/specialty", specialtyRoutes);
router.use("/doctor", doctorRoutes);
router.use("/user", userRoutes);
router.use("/admin", adminRoutes);
router.use("/schedule", scheduleRoutes);
router.use("/doctorSchedule", doctorScheduleRoutes);
router.use("/payment", paymentRoutes);
router.use("/appointment", appointmentRoutes);
router.use("/patient", patientRoutes);
router.use("/review", reviewRoutes);
router.use("/prescription", prescriptionRoutes);

export const IndexRoutes = router;
