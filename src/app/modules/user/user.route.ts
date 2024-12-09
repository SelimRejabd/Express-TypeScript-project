import express from "express";
import { UserController } from "./user.controller";
import { StudentValidations } from "../student/student.validation";
import validateRequest from "../../middleware/validateRequest";

const router = express.Router();

router.post(
  "/create-student",
  validateRequest(StudentValidations.CreateStudentValidationSchema),
  UserController.createStudent
);

export const UserRoutes = router;
