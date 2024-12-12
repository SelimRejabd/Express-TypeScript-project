import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";


const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Academic semester created successfully.",
    data: result,
  });
});

const getAcademicSemester = catchAsync(async(req, res) => {
    const result = await AcademicSemesterServices.getAcademicSemesterFromDB();

    sendResponse(res, {
        statusCode: 200,
        success : true,
        message : "All academic Semesters data retrived succesfully.",
        data : result
    })
})

const getAcademicSemesterById = catchAsync(async(req, res)=> {
    const {semesterId} = req.params;
    const result = await AcademicSemesterServices.getAcademicSemesterByIdFromDB(semesterId);
    sendResponse(res, {
        statusCode: 200,
        success : true,
        message : "Academic Semester data retrived succesfully.",
        data : result
    })
});

const updateAcademicSemester = catchAsync (async(req, res)=> {
  const {semesterId} = req.params;
  const result = await AcademicSemesterServices.updateAcademicSemesterIntoDB(semesterId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success : true,
    message : "Academic Semester data updated succesfully.",
    data : result
})
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
  getAcademicSemester,
  getAcademicSemesterById,
  updateAcademicSemester
};
