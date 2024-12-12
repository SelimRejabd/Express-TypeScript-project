import config from "../../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


const createStudentIntoDB = async (password: string, studentData: TStudent) => {

  const admissionSemester = await AcademicSemester.findById(
    studentData.admissionSemester
  );

  const userData: Partial<TUser> = {
    password: password || (config.default_password as string),
    role: "student",
    id: await generateStudentId(admissionSemester),
  };
  const newUser = await User.create(userData);
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
