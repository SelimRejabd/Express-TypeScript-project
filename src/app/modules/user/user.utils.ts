import { TAcademicSemester } from "../academicSemester/academicSemester.inserface";
import { User } from "./user.model";

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: "student",
    },
    {
      id: 1,
      _id: 0,
    }
  )
    .sort({ id: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester | null) => {
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId();

  if (lastStudentId) {
    const lastStudentSemesterCode = lastStudentId.substring(4, 6);
    const lastStudentYear = lastStudentId.substring(0, 4);

    const currentStudentSemesterCode = payload?.code;
    const currentStudentYear = payload?.year;

    if (
      lastStudentSemesterCode === currentStudentSemesterCode &&
      lastStudentYear === currentStudentYear
    ) {
      currentId = lastStudentId.substring(6);
    }
  }
  let increment = (Number(currentId) + 1).toString().padStart(4, "0");
  increment = `${payload?.year}${payload?.code}${increment}`;

  return increment;
};
