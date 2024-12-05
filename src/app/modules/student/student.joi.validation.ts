import Joi from "joi";

const userNameValidationSchema = Joi.object({
    firstName: Joi.string()
      .trim()
      .required()
      .max(40)
      .pattern(/^[A-Z][a-zA-Z]*$/, "Capitalize format")
      .messages({
        "string.base": "First Name must be a string.",
        "string.empty": "First Name is required.",
        "string.max": "First Name cannot be more than 40 characters.",
        "string.pattern.base": "First Name must start with a capital letter.",
      }),
    middleName: Joi.string().trim().max(40).allow("").messages({
      "string.max": "Middle Name cannot be more than 40 characters.",
    }),
    lastName: Joi.string()
      .trim()
      .required()
      .max(40)
      .pattern(/^[a-zA-Z]+$/, "alphabetic")
      .messages({
        "string.base": "Last Name must be a string.",
        "string.empty": "Last Name is required.",
        "string.max": "Last Name cannot be more than 40 characters.",
        "string.pattern.base":
          "Last Name must contain only alphabetic characters.",
      }),
  });

  const guardianValidationSchema = Joi.object({
    fatherName: Joi.string().required().messages({
      "string.empty": "Father's Name is required.",
    }),
    fatherContact: Joi.string()
      .required()
      .pattern(/^\+?[1-9]\d{1,14}$/, "valid phone number")
      .messages({
        "string.empty": "Father's Contact is required.",
        "string.pattern.base":
          "Father's Contact must be a valid phone number.",
      }),
    motherName: Joi.string().required().messages({
      "string.empty": "Mother's Name is required.",
    }),
    motherContact: Joi.string()
      .required()
      .pattern(/^\+?[1-9]\d{1,14}$/, "valid phone number")
      .messages({
        "string.empty": "Mother's Contact is required.",
        "string.pattern.base":
          "Mother's Contact must be a valid phone number.",
      }),
  });

  export const studentValidationSchema = Joi.object({
    id: Joi.string().required().messages({
      "string.empty": "ID is required.",
    }),
    name: userNameValidationSchema.required().messages({
      "any.required": "Name is required.",
    }),
    gender: Joi.string()
      .required()
      .valid("male", "female", "other")
      .messages({
        "string.empty": "Gender is required.",
        "any.only": "{#value} is not a valid gender.",
      }),
    dateOfBirth: Joi.string()
      .required()
      // .custom((value, helpers) => {
      //   if (!Joi.date().iso().validate(value).error) return value;
      //   return helpers.message("{#value} is not a valid ISO date.");
      // })
      .messages({
        "string.empty": "Date of Birth is required.",
      }),
    email: Joi.string().email().required().messages({
      "string.email": "{#value} is not a valid email.",
      "string.empty": "Email is required.",
    }),
    contactNo: Joi.string()
      .required()
      .pattern(/^\+?[1-9]\d{1,14}$/, "valid phone number")
      .messages({
        "string.empty": "Contact Number is required.",
        "string.pattern.base": "{#value} is not a valid contact number.",
      }),
    bloodGroup: Joi.string()
      .valid("A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-")
      .messages({
        "any.only": "{#value} is not a valid blood group.",
      }),
    presentAddress: Joi.string().required().messages({
      "string.empty": "Present Address is required.",
    }),
    permanentAddress: Joi.string().required().messages({
      "string.empty": "Permanent Address is required.",
    }),
    guardian: guardianValidationSchema.required().messages({
      "any.required": "Guardian information is required.",
    }),
    localGuardian: guardianValidationSchema.required().messages({
      "any.required": "Local Guardian information is required.",
    }),
    profileImage: Joi.string().uri().messages({
      "string.uri": "{#value} is not a valid URL.",
    }),
    isActive: Joi.string()
      .valid("active", "blocked")
      .default("active")
      .messages({
        "any.only": "{#value} is not a valid status.",
      }),
  });
