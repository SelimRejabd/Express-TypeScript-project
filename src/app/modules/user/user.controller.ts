import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import sendResponse from "../../utils/sendResponse";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, studentData } = req.body;
    const result = await UserService.createStudentIntoDB(password, studentData);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student created successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
