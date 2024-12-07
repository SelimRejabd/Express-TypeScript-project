import { z } from "zod";

// Zod Schema for UserName
const UserNameValidationSchema = z.object({
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
const GuardianValidationSchema = z.object({
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
export const StudentValidationSchema = z.object({
  id: z.string().min(1, "ID is required."),
  name: UserNameValidationSchema,
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender is not valid." }),
  }),
  dateOfBirth: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), "Date of Birth is not valid."),
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Email is not valid."),
  contactNo: z
    .string()
    .min(1, "Contact Number is required.")
    .refine(
      (value) => /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
      "Contact Number is not valid."
    ),
    emergencyContactNo: z
    .string()
    .min(1, "Contact Number is required.")
    .refine(
      (value) => /^(?:\+?\d{1,3}[-.●]?)?(?:\d{1,4}[-.●]?){1,4}$/.test(value),
      "Contact Number is not valid."
    ),
  bloodGroup: z.enum(["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"]).optional(),
  presentAddress: z.string().min(1, "Present Address is required."),
  permanentAddress: z.string().min(1, "Permanent Address is required."),
  guardian: GuardianValidationSchema,
  localGuardian: GuardianValidationSchema,
  profileImage: z
    .string()
    .optional()
    .refine((value) => !value || /^https?:\/\/[^\s]+$/.test(value), {
      message: "Profile Image must be a valid URL.",
    }),
  isActive: z.enum(["active", "blocked"]).optional().default("active"),
  isDeleted: z.boolean().optional().default(false)
});
