import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.inserface"
import { AcademicSemeter } from "./academicSemester.model"


const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {


    if (academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error ("Invalid semester code.");
    }

    const result = await AcademicSemeter.create(payload);
    return result;
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}