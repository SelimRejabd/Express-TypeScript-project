import { z } from "zod";

export const userValidationSchema = z.object({
  password: z
    .string({
        invalid_type_error : "Password mast be string."
    })
    .max(20, { message: "Password can not be more than 20 char" })
    .optional(),
});
