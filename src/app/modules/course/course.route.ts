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

router.get('/', CourseControllers.getAllCourses);
router.get('/:courseId', CourseControllers.getSingleCourse);
router.delete('/delete/:courseId', CourseControllers.deleteCourse)

export const CourseRoutes = router;
