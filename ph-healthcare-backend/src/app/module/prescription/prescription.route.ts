import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { prescriptionController } from "./prescription.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { prescriptionValidation } from "./prescription.validation";

const router = Router();

router.get(
    '/',
    checkAuth(Role.SUPER_ADMIN, Role.ADMIN),
    prescriptionController.getAllPrescriptions
);

router.get(
    '/my-prescriptions',
    checkAuth(Role.PATIENT, Role.DOCTOR),
    prescriptionController.myPrescriptions
)

router.post(
    '/',
    checkAuth(Role.DOCTOR),
    validateRequest(prescriptionValidation.createPrescriptionZodSchema),
    prescriptionController.givePrescription
)

router.patch(
    '/:id',
    checkAuth(Role.DOCTOR),
    validateRequest(prescriptionValidation.updatePrescriptionZodSchema),
    prescriptionController.updatePrescription
)

router.delete(
    '/:id',
    checkAuth(Role.DOCTOR),
    prescriptionController.deletePrescription
)

export const prescriptionRoutes = router;