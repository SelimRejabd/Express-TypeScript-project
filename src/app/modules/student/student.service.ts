import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TStudent } from "./student.interface";
import QueryBuilder from "../../builder/QueryBuilder";
import { studentSearchableFields } from "./student.constant";

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  /*
  let searchTerm = "";
  const queryObject = { ...query };
  const studentSearchableFields = ["email", "name.firstName", "presentAddress"];

  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: "i" },
    })),
  });

  const excludesFields = ["searchTerm", "sort", "limit", "page", "fields"];

  excludesFields.forEach((el) => delete queryObject[el]);

  const filterQuery = searchQuery
    .find(queryObject)
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: "academicFaculty",
    });

  let sort = "-createdAt";

  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);

  let limit = 1;
  let page = 1;
  let skip = 0;
  if (query.limit) {
    limit = Number(query.limit);
  }
  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }

  const paginateQuery = sortQuery.skip(skip);

  const limitQuery = paginateQuery.limit(limit);

  let fields = "-__v";

  if (query.fields) {
    fields = (query.fields as string).split(",").join(" ");
  }

  const fieldsQuery = await limitQuery.select(fields);
 
  return fieldsQuery;
  */

  const studentQuery = new QueryBuilder(
    Student.find().populate("admissionSemester").populate({
      path: "academicDepartment",
      populate: "academicFaculty",
    }),
    query
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate("admissionSemester")
    .populate({
      path: "academicDepartment",
      populate: "academicFaculty",
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    if (await Student.isUserExists(id)) {
      const deletedStudent = await Student.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true }
      );

      if (!deletedStudent) {
        throw new AppError(500, "Failed to delete student");
      }

      const deletedUser = await User.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true }
      );

      if (!deletedUser) {
        throw new AppError(500, "Failed to delete user");
      }

      await session.commitTransaction();
    } else throw new Error("User not exist with this id.");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};
const updateStudentIntoDB = async (
  studentId: string,
  studentData: Partial<TStudent>
) => {
  const { name, guardian, localGuardian, ...remainingStudentData } =
    studentData;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate(
    { id: studentId },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
