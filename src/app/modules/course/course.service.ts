/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from "mongoose";
import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import AppError from "../../errors/AppError";

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await Course.create(courseData);
  return result;
};

const updateCourseIntoDB = async (
  courseId: string,
  courseData: Partial<TCourse>
) => {
  const { preRequisiteCourses, ...courseRemainingData } = courseData;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedbasicCourseInfo = await Course.findByIdAndUpdate(
      courseId,
      courseRemainingData,
      {
        new: true,
        runValidators: true,
        session,
      }
    );

    if (!updatedbasicCourseInfo) {
      throw new AppError(500, "Failed to update course.");
    }

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
      const deletedPreRequisites = preRequisiteCourses
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPreRequisitesCourses = await Course.findByIdAndUpdate(
        courseId,
        {
          $pull: {
            preRequisiteCourses: {
              course: { $in: deletedPreRequisites },
            },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!deletedPreRequisitesCourses) {
        throw new AppError(500, "Failed to update course.");
      }

      const newPreRequisites = preRequisiteCourses?.filter(
        (el) => el.course && !el.isDeleted
      );

      const newPreRequisiteCourses = await Course.findByIdAndUpdate(
        courseId,
        {
          $addToSet: {
            preRequisiteCourses: { $each: newPreRequisites },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        }
      );

      if (!newPreRequisiteCourses) {
        throw new AppError(500, "Failed to update course.");
      }
    }

    await session.commitTransaction();

    const result = await Course.findById(courseId).populate(
      "preRequisiteCourses.course"
    );

    return result;
  } catch (err) {
    await session.abortTransaction();
    throw new AppError(500, "Failed to update course");
  } finally {
    await session.endSession();
  }
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate("preRequisiteCourses.course"),
    query
  )
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await courseQuery.modelQuery;
  return result;
};

const getSingleCourseFromDB = async (courseId: string) => {
  const result = await Course.findById(courseId).populate(
    "preRequisiteCourses.course"
  );
  return result;
};

const deleteCourseFromDB = async (courseId: string) => {
  const result = await Course.findByIdAndUpdate(
    courseId,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  updateCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
