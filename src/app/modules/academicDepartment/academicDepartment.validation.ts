import { z } from "zod";

const cretaeAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: "Academic Department name must be string.",
      required_error: "Academic Department name is required.",
    }),
    academicFaculty: z.string({
      invalid_type_error: "Academic Faculty Id must be string.",
      required_error: "Academic Faculty Id is required.",
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Academic Department name must be string.",
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: "Academic Faculty Id must be string.",
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidations = {
  cretaeAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
