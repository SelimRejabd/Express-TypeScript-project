import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Cousre } from "./course.model";

const createCourseIntoDB = async (courseData: TCourse) => {
  const result = await Cousre.create(courseData);
  return result;
};

const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Cousre.find().populate("preRequisiteCourses.course"),
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
  const result = await Cousre.findById(courseId);
  return result;
};

const deleteCourseFromDB = async (courseId: string) => {
  const result = await Cousre.findByIdAndUpdate(
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
  getAllCoursesFromDB,
  getSingleCourseFromDB,
  deleteCourseFromDB,
};
