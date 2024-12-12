import { z } from "zod";

const createAcademicFacaultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Faculty Name must be string type.",
    }),
  }),
});

const updateAcademicFacaultyValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Faculty Name must be string type.",
      })
      .optional(),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacaultyValidationSchema,
  updateAcademicFacaultyValidationSchema,
};
