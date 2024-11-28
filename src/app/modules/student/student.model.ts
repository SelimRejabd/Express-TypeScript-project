import { Schema, model } from "mongoose";
import { Guardian, Student, UserName } from "./student.interface";

const UserNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContact: { type: String, required: true },
});

const localGuardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherContact: { type: String, required: true },
  motherName: { type: String, required: true },
  motherContact: { type: String, required: true },
});

export const studentSchema = new Schema<Student>({
  id: { type: String },
  name: UserNameSchema,
  gender: ["male", "female"],
  dateOfBirth: { type: String },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  bloodGroup: ["A+", "A-", "AB+", "AB-", "B+", "B-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: ["active", "blocked"],
});

export const StudentModel = model<Student>("Student", studentSchema);
