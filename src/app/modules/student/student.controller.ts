import { Request, Response } from "express";
import { StudentServices } from "./student.service";

export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body.student;
    const result = await StudentServices.createStudentIntoDB(student);

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create student data.",
      error: error,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students data retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get students data.",
      error: error,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getStudentByIdFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Student data retrived successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to get student data.",
      error: error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getStudentById,
};
