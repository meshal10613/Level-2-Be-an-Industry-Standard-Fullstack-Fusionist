import { Router } from "express";
import { doctorController } from "./doctor.controller";

const router = Router();

router.get("/", doctorController.getAllDoctors);
// router.get("/:id", DoctorController.getDoctorById);
// router.put("/:id", DoctorController.updateDoctor);
//router.patch("/:id", DoctorController.updateDoctor);
// router.delete("/:id", DoctorController.deleteDoctor);

export const doctorRoute = router;