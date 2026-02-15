import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { scheduleController } from "./schedule.controller";

const router = Router();

router.post(
    "/",
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
    scheduleController.createSchedule,
);

router.get(
    "/",
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR),
    scheduleController.getAllSchedules,
);

router.get(
    "/:id",
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN, Role.DOCTOR),
    scheduleController.getScheduleById,
);

router.patch(
	"/:id",
	checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
	scheduleController.updateSchedule,
);

router.delete(
	"/:id",
	checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
	scheduleController.deleteSchedule,
);

export const scheduleRoutes = router;
