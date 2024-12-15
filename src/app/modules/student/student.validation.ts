import { z } from "zod";

// Zod Schema for UserName
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First Name is required.")
    .max(40, "First Name cannot be more than 40 characters.")
    .refine(
      (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      "First Name must start with an uppercase letter."
    ),
  middleName: z
    .string()
    .trim()
    .max(40, "Middle Name cannot be more than 40 characters."),
  lastName: z
    .string()
    .trim()
    .min(1, "Last Name is required.")
    .max(40, "Last Name cannot be more than 40 characters.")
    .refine(
      (value) => /^[A-Za-z]+$/.test(value),
      "Last Name contains invalid characters. Only letters are allowed."
    ),
});

// Zod Schema for Guardian
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's Name is required."),
  fatherContact: z
    .string()
    .min(1, "Father's Contact is required.")
    .refine(
      (value) => /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
      "Father's Contact is not a valid contact number."
    ),
  motherName: z.string().min(1, "Mother's Name is required."),
  motherContact: z
    .string()
    .min(1, "Mother's Contact is required.")
    .refine(
      (value) => /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
      "Mother's Contact is not a valid contact number."
    ),
});

// Zod Schema for Student
const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    studentData: z.object({
      name: userNameValidationSchema,
      gender: z.enum(["male", "female"], {
        errorMap: () => ({ message: "Gender is not valid." }),
      }),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, "Email is required.")
        .email("Email is not valid."),
      contactNo: z
        .string()
        .min(1, "Contact Number is required.")
        .refine(
          (value) =>
            /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
          "Contact Number is not valid."
        ),
      emergencyContactNo: z
        .string()
        .min(1, "Contact Number is required.")
        .refine(
          (value) =>
            /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
          "Contact Number is not valid."
        ),
      bloodGroup: z
        .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"])
        .optional(),
      presentAddress: z.string().min(1, "Present Address is required."),
      permanentAddress: z.string().min(1, "Permanent Address is required."),
      guardian: guardianValidationSchema,
      localGuardian: guardianValidationSchema,
      profileImage: z
        .string()
        .optional()
        .refine((value) => !value || /^https?:\/\/[^\s]+$/.test(value), {
          message: "Profile Image must be a valid URL.",
        }),
      admissionSemester: z.string(),
      academicDepartment: z.string(),
    }),
  }),
});

const userNameUpdateValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First Name is required.")
    .max(40, "First Name cannot be more than 40 characters.")
    .refine(
      (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      "First Name must start with an uppercase letter."
    )
    .optional(),
  middleName: z
    .string()
    .trim()
    .max(40, "Middle Name cannot be more than 40 characters.")
    .optional(),
  lastName: z
    .string()
    .trim()
    .min(1, "Last Name is required.")
    .max(40, "Last Name cannot be more than 40 characters.")
    .refine(
      (value) => /^[A-Za-z]+$/.test(value),
      "Last Name contains invalid characters. Only letters are allowed."
    )
    .optional(),
});

const guardianUpdateValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's Name is required.").optional(),
  fatherContact: z
    .string()
    .min(1, "Father's Contact is required.")
    .refine(
      (value) => /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
      "Father's Contact is not a valid contact number."
    )
    .optional(),
  motherName: z.string().min(1, "Mother's Name is required.").optional(),
  motherContact: z
    .string()
    .min(1, "Mother's Contact is required.")
    .refine(
      (value) => /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
      "Mother's Contact is not a valid contact number."
    )
    .optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20).optional(),
    studentData: z.object({
      name: userNameUpdateValidationSchema.optional(),
      gender: z
        .enum(["male", "female"], {
          errorMap: () => ({ message: "Gender is not valid." }),
        })
        .optional(),
      dateOfBirth: z.string().optional(),
      email: z
        .string()
        .min(1, "Email is required.")
        .email("Email is not valid.")
        .optional(),
      contactNo: z
        .string()
        .min(1, "Contact Number is required.")
        .refine(
          (value) =>
            /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
          "Contact Number is not valid."
        )
        .optional(),
      emergencyContactNo: z
        .string()
        .min(1, "Contact Number is required.")
        .refine(
          (value) =>
            /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
          "Contact Number is not valid."
        )
        .optional(),
      bloodGroup: z
        .enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"])
        .optional(),
      presentAddress: z
        .string()
        .min(1, "Present Address is required.")
        .optional(),
      permanentAddress: z
        .string()
        .min(1, "Permanent Address is required.")
        .optional(),
      guardian: guardianUpdateValidationSchema.optional(),
      localGuardian: guardianUpdateValidationSchema.optional(),
      profileImage: z
        .string()
        .optional()
        .refine((value) => !value || /^https?:\/\/[^\s]+$/.test(value), {
          message: "Profile Image must be a valid URL.",
        })
        .optional(),
      admissionSemester: z.string().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});

export const StudentValidations = {
  CreateStudentValidationSchema,
  updateStudentValidationSchema,
};
