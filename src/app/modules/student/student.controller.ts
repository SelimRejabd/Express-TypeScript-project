import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";


const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Students data retrived successfully",
    data: result,
  });
});

const getStudentById = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.getStudentByIdFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student data retrived successfully",
    data: result,
  });
});

const deleteStudent= catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentServices.deleteStudentFromDB(studentId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student is deleted.",
    data: result,
  });
});

const udpateStudent = catchAsync(async (req, res)=>{
  const { studentId } = req.params;
  const {studentData} = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, studentData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Student is updated.",
    data: result,
  });
})

export const StudentControllers = {
  getAllStudents,
  getStudentById,
  deleteStudent,
  udpateStudent
};
