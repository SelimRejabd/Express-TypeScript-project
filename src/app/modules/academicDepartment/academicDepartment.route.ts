import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { AcademicDepartmentValidations } from "./academicDepartment.validation";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(
    AcademicDepartmentValidations.cretaeAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.cretaeAcademicDepartment
);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartment);

router.get(
  "/:academicDepartmentId",
  AcademicDepartmentControllers.getAcademicDepartmentById
);

router.patch(
  '/update/:academicDepartmentId',
  validateRequest(
    AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema
  ),
  AcademicDepartmentControllers.updateAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
