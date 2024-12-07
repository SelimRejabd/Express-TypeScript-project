import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Students data retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getStudentById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentByIdFromDB(studentId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student data retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Student is deleted.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const StudentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudent,
};