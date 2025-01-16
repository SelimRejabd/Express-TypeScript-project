import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { OfferedCourseValidations } from "./offeredCourse.validation";
import { OfferedCourseControllers } from "./offeredCourse.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse
);

router.get("/", OfferedCourseControllers.getAllOfferedCourses);

router.get("/:id", OfferedCourseControllers.getSingleOfferedCourse);

router.patch(
  "/udpate/:id",
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.udpateOfferedCourse
);

router.delete("/delete/:id", OfferedCourseControllers.deleteOfferedCourse);

export const OfferedCourseRoutes = router;
