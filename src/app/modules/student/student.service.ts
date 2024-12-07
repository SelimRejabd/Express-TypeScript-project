import { Student } from "./student.model";

// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error("User already exist with this id.");
//   }

//   const result = await Student.create(studentData);

//   // const student = new Student(studentData);
//   // if(await student.isUserExists(studentData.id)){
//   //   throw new Error('User already exist with this id.');
//   // }
//   // const result = await student.save();

//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  if (await Student.isUserExists(id)) {
    const result = await Student.updateOne({ id }, { isDeleted: true });
    return result;
  } else throw new Error("User not exist with this id.");
};

export const StudentServices = {
  getAllStudentsFromDB,
  getStudentByIdFromDB,
  deleteStudentFromDB,
};
