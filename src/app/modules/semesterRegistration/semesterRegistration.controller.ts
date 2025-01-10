import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester Registration is created succesfully.",
      data: result,
    });
  }
);
const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(
        req.query
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester Registration data retrived succesfully.",
      data: result,
    });
  }
);

const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.getSingleSemesterRegitrationFromDB(id);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester Registration data retrived succesfully.",
      data: result,
    });
  }
);

const updateSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        id,
        req.body
      );
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Semester Registration updated succesfully.",
      data: result,
    });
  }
);

export const SemesterRegistraionControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
};
