import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferdCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";

const createOfferedCourseIntoDB = async (payload: TOfferdCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
  } = payload;

  const semesterRegistrationData = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!semesterRegistrationData) {
    throw new AppError(404, "Semester Registration is not found");
  }

  const academicDepartmentData = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!academicDepartmentData) {
    throw new AppError(404, "Academic Department is not found");
  }
  const academicFacultyData = await AcademicFaculty.findById(
    academicFaculty
  );
  if (!academicFacultyData) {
    throw new AppError(404, "Academic Faculty is not found");
  }

  const courseData = await Course.findById(course);
  if (!courseData) {
    throw new AppError(404, "Course is not found");
  }

  const facultyData = await Faculty.findById(faculty);
  if (!facultyData) {
    throw new AppError(404, "Faculty is not found");
  }
  const academicSemester = semesterRegistrationData.academicSemester;
  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourse.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
};
