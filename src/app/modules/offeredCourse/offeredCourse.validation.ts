import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeStringSchema = z
.string()
.refine(
  (time) => {
    const regex = /^([01]?[0-1]|2[0-3]):[0-5][0-9]$/;
    return regex.test(time);
  },
  {
    message: "Invalid time format. Expected HH:MM in 24 hours format.",
  }
)

const createOfferedCourseValidationSchema = z.object({
  body: z
    .object({
      semesterRegistration: z.string(),
      academicFaculty: z.string(),
      course: z.string(),
      faculty: z.string(),
      academicDepartment: z.string(),
      maxCapacity: z.number(),
      section: z.number(),
      days: z.array(z.enum([...Days] as [string, ...string[]])),
      startTime: timeStringSchema,
      endTime: timeStringSchema,
    })
    .refine((body) => {
      const start = -new Date(`2000-01-01T${body.startTime}`);
      const end = -new Date(`2000-01-01T${body.endTime}`);
      return end > start;
    },{
      message: "Start time should be before end time."
    }),
});

const updateOfferedCourseValidationSchema = z.object({
  body: z.object({
    semesterRegistration: z.string().optional(),
    academicFaculty: z.string().optional(),
    course: z.string().optional(),
    faculty: z.string(),
    academicDepartment: z.string().optional(),
    maxCapacity: z.number().optional(),
    section: z.number().optional(),
    days: z.array(z.enum([...Days] as [string, ...string[]])).optional(),
    startTime: timeStringSchema,
    endTime: timeStringSchema,
  }),
});

export const OfferedCourseValidations = {
  createOfferedCourseValidationSchema,
  updateOfferedCourseValidationSchema,
};
