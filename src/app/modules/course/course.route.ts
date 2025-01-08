import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse
);

router.get("/", CourseControllers.getAllCourses);

router.get("/:courseId", CourseControllers.getSingleCourse);

router.delete("/delete/:courseId", CourseControllers.deleteCourse);

router.patch(
  "/update/:courseId",
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse
);

router.put(
  "/:courseId/assign-faulties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse
);

router.delete(
  "/:courseId/remove-faulties",
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse
);

export const CourseRoutes = router;
