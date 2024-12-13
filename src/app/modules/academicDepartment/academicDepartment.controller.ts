import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const cretaeAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmenetIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department cretaed succesfully.",
    data: result,
  });
});

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "All Academic Department data are retrived succesfully.",
    data: result,
  });
});

const getAcademicDepartmentById = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await AcademicDepartmentServices.getAcademicDepartmentByIdFromDB(
      academicDepartmentId
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department data retrived succesfully.",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { academicDepartmentId } = req.params;
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDB(
      academicDepartmentId,
      req.body
    );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Department data updated succesfully.",
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  cretaeAcademicDepartment,
  getAllAcademicDepartment,
  getAcademicDepartmentById,
  updateAcademicDepartment,
};
