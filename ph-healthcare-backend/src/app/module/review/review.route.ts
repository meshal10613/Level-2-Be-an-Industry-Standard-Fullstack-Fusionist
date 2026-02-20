import { Router } from "express";
import { reviewController } from "./review.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../../../generated/prisma/enums";
import { validateRequest } from "../../middleware/validateRequest";
import { reviewValidation } from "./review.validation";

const router = Router();

router.get("/", reviewController.getAllReviews);

router.post(
    "/",
    checkAuth(Role.PATIENT),
    validateRequest(reviewValidation.createReviewZodSchema),
    reviewController.giveReview,
);

router.get(
    "/my-reviews",
    checkAuth(Role.PATIENT, Role.DOCTOR),
    reviewController.myReviews,
);

router.patch(
    "/:id",
    checkAuth(Role.PATIENT),
    validateRequest(reviewValidation.updateReviewZodSchema),
    reviewController.updateReview,
);

router.delete("/:id", checkAuth(Role.PATIENT), reviewController.deleteReview);

export const reviewRoutes = router;
