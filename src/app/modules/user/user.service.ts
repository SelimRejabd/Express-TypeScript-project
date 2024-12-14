import mongoose from "mongoose";
import config from "../../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import AppError from "../../errors/AppError";

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const userData: Partial<TUser> = {
      password: password || (config.default_password as string),
      role: "student",
      id: await generateStudentId(admissionSemester),
    };

    const newUser = await User.create([userData], { session });
    if (!newUser.length) {
      throw new AppError(500, "Failed to create user");
    }

    studentData.id = newUser[0].id;
    studentData.user = newUser[0]._id;

    const newStudent = await Student.create([studentData], { session });

    if (!newStudent.length) {
      throw new AppError(500, "Failed to create Student");
    }
    await session.commitTransaction();
    return newStudent[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export const UserService = {
  createStudentIntoDB,
};
