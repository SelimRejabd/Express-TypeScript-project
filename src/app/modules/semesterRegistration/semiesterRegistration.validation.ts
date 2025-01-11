import { z } from "zod";
import { SemesterRegistrationStatus } from "./semesterRegistration.constant";

const createSemesterRegitrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string(),
    status: z.enum([...(SemesterRegistrationStatus as [string, ...string[]])]),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
    minCredit: z.number(),
    maxCredit: z.number(),
  }),
});

const updateSemesterRegitrationValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string().optional(),
    status: z
      .enum([...(SemesterRegistrationStatus as [string, ...string[]])])
      .optional(),
    startDate: z.string().datetime().optional(),
    endDate: z.string().datetime().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
  }),
});

export const SemesterRegistrationValidations = {
  createSemesterRegitrationValidationSchema,
  updateSemesterRegitrationValidationSchema,
};
