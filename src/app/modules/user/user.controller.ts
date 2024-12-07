import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, studentData } = req.body;
  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student created successfully.",
    data: result,
  });
});

export const UserController = {
  createStudent,
};
