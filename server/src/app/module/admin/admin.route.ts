import { Router } from "express";
import { Role } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";
import { validateRequest } from "../../middleware/validateRequest";
import { adminController } from "./admin.controller";
import { updateAdminZodSchema } from "./admin.validation";

const router = Router();

router.get(
    "/",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.getAllAdmins,
);
router.get(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    adminController.getAdminById,
);
router.patch(
    "/:id",
    checkAuth(Role.SUPER_ADMIN),
    validateRequest(updateAdminZodSchema),
    adminController.updateAdmin,
);
router.delete("/:id", checkAuth(Role.SUPER_ADMIN), adminController.deleteAdmin);

router.patch(
    "/change-user-status",
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
    adminController.changeUserStatus,
);
router.patch(
    "/change-user-role",
    checkAuth(Role.SUPER_ADMIN),
    adminController.changeUserRole,
);

export const adminRoutes = router;
