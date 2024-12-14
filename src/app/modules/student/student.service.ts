import mongoose from "mongoose";
import { Student } from "./student.model";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate("admissionSemester").populate({
    path: "academicDepartment",
    populate: "academicFaculty",
  });
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

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
};
