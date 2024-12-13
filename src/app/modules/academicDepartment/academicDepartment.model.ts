import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  academicFaculty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "AcademicFaculty",
  },
});

// academicDepartmentSchema.pre("save", async function (next) {
//   const isDepartmentExist = await AcademicDepartment.findOne({
//     name: this.name,
//   });

//   if (isDepartmentExist) {
//     throw new Error("Department is already exist.");
//   }
//   next();
 
// });

// academicDepartmentSchema.pre("findOne", async function (next) {
//   const query = this.getQuery();

//   const isDepartmentExist = await AcademicDepartment.findOne(query);

//   if (!isDepartmentExist) {
//     throw new Error("Department doesn't exist.");
//   }
//   next();
// });

academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
  const query = this.getQuery();

  const isDepartmentExist = await AcademicDepartment.findOne(query);

  if (!isDepartmentExist) {
    throw new Error("Department doesn't exist.");
  }
  next();
});

export const AcademicDepartment = model(
  "AcademicDepartment",
  academicDepartmentSchema
);
