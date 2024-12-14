import { Model, Types } from "mongoose";

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherContact: string;
  motherName: string;
  motherContact: string;
};

export type TStudent = {
  id: string;
  user : Types.ObjectId;
  name: TUserName;
  gender: "male" | "female";
  dateOfBirth: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TGuardian;
  profileImage?: string;
  admissionSemester : Types.ObjectId;
  academicDepartment : Types.ObjectId;
  isDeleted : boolean;
};

// for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string) : Promise<TStudent | null>
}

// for creating instance
// export type StudentMethods = {
//   isUserExists(id: string) : Promise<TStudent | null>;
// }

// export type StudentModel = Model<TStudent, Record<string, never>, StudentMethods>
