import { Router } from "express";
import { specialtyController } from "./specialty.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { updateSpecialtySchema } from "./specialty.validation";

const router = Router();

router.post("/", specialtyController.createSpecialty);
router.get("/", specialtyController.getAllSpecialty);
router.delete("/:id", specialtyController.deleteSpecialty);
router.patch(
    "/:id",
    validateRequest(updateSpecialtySchema),
    specialtyController.updateSpecialty,
);

export const specialtyRoute = router;
