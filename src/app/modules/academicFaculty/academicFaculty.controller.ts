import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacaultyIntoDB(
    req.body
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty created successfuly",
    data: result,
  });
});

const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty data retrived successfuly",
    data: result,
  });
});

const getAcademicFacultyById = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;
  const result = await AcademicFacultyServices.getAcademicFacultyByIdFromDB(
    academicFacultyId
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty data retrived successfuly",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { academicFacultyId } = req.params;
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDB(
    academicFacultyId,
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic Faculty data updated successfuly",
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getAcademicFacultyById,
  updateAcademicFaculty,
};
