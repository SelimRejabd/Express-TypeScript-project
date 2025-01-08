import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Coursse created successfully.",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.updateCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Coursse updated successfully.",
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Courses data retrived successfully.",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course data retrived successfully.",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const courseId = req.body;
  const result = await CourseServices.deleteCourseFromDB(courseId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Course data deleted successfully.",
    data: result,
  });
});

const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.assignFacultiesWithCourseIntoDB(courseId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculties assigned with course successfully.",
    data: result,
  });
});

const removeFacultiesFromCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseServices.removeFacultiesWithCourseFromDB(courseId, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Faculties removed with course successfully.",
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  updateCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse
};
