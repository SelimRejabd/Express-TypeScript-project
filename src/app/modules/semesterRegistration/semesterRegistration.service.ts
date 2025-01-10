import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { RegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration
) => {
  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExists = await AcademicSemester.findById(
    academicSemester
  );

  if (!isAcademicSemesterExists) {
    throw new AppError(404, "Academic Semester is not found in DB.");
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });

  if (isSemesterRegistrationExists) {
    throw new AppError(400, "This semester is already exists.");
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate("academicSemester"),
    query
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegitrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id).populate(
    "academicSemester"
  );
  return result;
};

const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>
) => {
  const isSemisterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemisterRegistrationExists) {
    throw new AppError(404, "Semester is not found with this Id.");
  }
  const requestedSemesterStatus = isSemisterRegistrationExists?.status;
  if (requestedSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      400,
      `This semester is already ${requestedSemesterStatus}`
    );
  }
  const result = SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const SemesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegitrationFromDB,
  updateSemesterRegistrationIntoDB,
};
