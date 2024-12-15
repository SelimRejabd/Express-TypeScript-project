import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middleware/validateRequest";
import { StudentValidations } from "./student.validation";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getStudentById);

router.delete("/:studentId", StudentControllers.deleteStudent);

router.patch(
  "/update/:studentId",
  validateRequest(StudentValidations.updateStudentValidationSchema),
  StudentControllers.udpateStudent
);

export const StudentRoutes = router;
