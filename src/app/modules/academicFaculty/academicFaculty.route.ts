import express from "express";
import { AcademicFacultyControllers } from "./academicFaculty.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicFacultyValidations } from "./academicFaculty.validation";

const router = express.Router();

router.post(
  "/create",
  validateRequest(
    AcademicFacultyValidations.createAcademicFacaultyValidationSchema
  ),
  AcademicFacultyControllers.createAcademicFaculty
);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculty);

router.get(
  "/:academicFacultyId",
  AcademicFacultyControllers.getAcademicFacultyById
);

router.patch(
  "/update/:academicFacultyId",
  validateRequest(
    AcademicFacultyValidations.updateAcademicFacaultyValidationSchema
  ),
  AcademicFacultyControllers.updateAcademicFaculty
);

export const AcademicFacultyRoutes = router;
