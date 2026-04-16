import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { doctorScheduleController } from "./doctorSchedule.controller";

const router = Router();

router.get(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorScheduleController.getAllDoctorSchedules,
);
router.get(
    "/:doctorId/schedule/:scheduleId",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    doctorScheduleController.getDoctorScheduleById,
);

router.post(
    "/create-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
    doctorScheduleController.createMyDoctorSchedule,
);
router.get(
    "/my-doctor-schedules",
    checkAuth(Role.DOCTOR),
    doctorScheduleController.getMyDoctorSchedules,
);
router.patch(
    "/update-my-doctor-schedule",
    checkAuth(Role.DOCTOR),
    doctorScheduleController.updateMyDoctorSchedule,
);
router.delete(
    "/delete-my-doctor-schedule/:id",
    checkAuth(Role.DOCTOR),
    doctorScheduleController.deleteMyDoctorSchedule,
);

export const doctorScheduleRoutes = router;
