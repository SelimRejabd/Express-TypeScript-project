import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { OfferedCourseServices } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourseIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered course created successfully.",
    data: result,
  });
});

const getAllOfferedCourses = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCoursesFromDB(
    req.query
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered courses data are retrived successfully.",
    data: result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered courses data retrived successfully.",
    data: result,
  });
});

const udpateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.udpateOfferedCourseIntoDB(
    id,
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered courses data are updated successfully.",
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await OfferedCourseServices.deleteOfferedCourseFromBD(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Offered course data deleted successfully.",
    data: result,
  });
});

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourses,
  getSingleOfferedCourse,
  udpateOfferedCourse,
  deleteOfferedCourse,
};
