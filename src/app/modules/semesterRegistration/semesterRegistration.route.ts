import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { SemesterRegistrationValidations } from "./semiesterRegistration.validation";
import { SemesterRegistraionControllers } from "./semesterRegistration.controller";

const router = Router();

router.post(
  "/create",
  validateRequest(
    SemesterRegistrationValidations.createSemesterRegitrationValidationSchema
  ),
  SemesterRegistraionControllers.createSemesterRegistration
);

router.get("/", SemesterRegistraionControllers.getAllSemesterRegistration);

router.get(
  "/:id",
  SemesterRegistraionControllers.getSingleSemesterRegistration
);

router.patch(
  "/update/:id",
  validateRequest(
    SemesterRegistrationValidations.updateSemesterRegitrationValidationSchema
  ),
  SemesterRegistraionControllers.updateSemesterRegistration
);

export const SemesterRegistrationRoutes = router;
