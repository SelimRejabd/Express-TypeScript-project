import { model, Schema } from "mongoose";
import {
  TCourse,
  TCourseFacalty,
  TPreRequisiteCourses,
} from "./course.interface";

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model("Course", courseSchema);

const courseFacultySchema = new Schema<TCourseFacalty>({
  course: {
    type: Schema.Types.ObjectId,
    unique: true,
    ref: "Course",
  },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: "Faculty",
    },
  ],
});

export const CousreFaculty = model("CourseFaculty", courseFacultySchema);
