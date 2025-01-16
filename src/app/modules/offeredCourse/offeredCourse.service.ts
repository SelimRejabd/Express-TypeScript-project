import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import { Course } from "../course/course.model";
import { Faculty } from "../Faculty/faculty.model";
import { SemesterRegistration } from "../semesterRegistration/semesterRegistration.model";
import { TOfferdCourse } from "./offeredCourse.interface";
import { OfferedCourse } from "./offeredCourse.model";
import { hasTimeConflict } from "./offeredCourse.utils";

const createOfferedCourseIntoDB = async (payload: TOfferdCourse) => {
  const {
    semesterRegistration,
    academicDepartment,
    academicFaculty,
    course,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  const semesterRegistrationData = await SemesterRegistration.findById(
    semesterRegistration
  );
  if (!semesterRegistrationData) {
    throw new AppError(404, "Semester Registration is not found");
  }

  if (semesterRegistrationData.status !== "UPCOMING") {
    throw new AppError(400, "You cannot update this offered course.");
  }

  const academicDepartmentData = await AcademicDepartment.findById(
    academicDepartment
  );
  if (!academicDepartmentData) {
    throw new AppError(404, "Academic Department is not found");
  }
  const academicFacultyData = await AcademicFaculty.findById(academicFaculty);
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

  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    academicFaculty,
    _id: academicDepartment,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      400,
      `This ${academicDepartmentData.name} is not belongs to ${academicFacultyData}`
    );
  }

  const isSameSection = await OfferedCourse.findOne({
    semesterRegistration,
    course,
    section,
  });

  if (!isSameSection) {
    throw new AppError(
      400,
      `Offered course with same section is already exist.`
    );
  }
  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      400,
      `This faculty is not available at that time, choose other time or day.`
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const getAllOfferedCoursesFromDB = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(
    OfferedCourse.find().populate(
      "semesterRegistration academicSemester academicFaculty academicDepartment course faculty"
    ),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await offeredCourseQuery.modelQuery;
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id).populate(
    "semesterRegistration academicSemester academicFaculty academicDepartment course faculty"
  );
  return result;
};

const udpateOfferedCourseIntoDB = async (
  id: string,
  payload: Pick<TOfferdCourse, "faculty" | "days" | "startTime" | "endTime">
) => {
  const { faculty, days, startTime, endTime } = payload;

  const offeredCourseData = await OfferedCourse.findById(id);
  if (!offeredCourseData) {
    throw new AppError(404, "Offered course not found.");
  }

  const facultyData = await Faculty.findById(faculty);
  if (!facultyData) {
    throw new AppError(404, "Faculty is not found");
  }

  const semesterRegistration = offeredCourseData.semesterRegistration;

  const assignedSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select("days startTime endTime");

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      400,
      `This faculty is not available at that time, choose other time or day.`
    );
  }

  const result = OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteOfferedCourseFromBD = async (id: string) => {
  const result = OfferedCourse.findByIdAndDelete(id);
  return result;
};

export const OfferedCourseServices = {
  createOfferedCourseIntoDB,
  getAllOfferedCoursesFromDB,
  udpateOfferedCourseIntoDB,
  getSingleOfferedCourseFromDB,
  deleteOfferedCourseFromBD,
};
