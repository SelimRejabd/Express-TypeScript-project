import { ZodError, ZodIssue } from "zod";
import { TErrorSources, TGnericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError) : TGnericErrorResponse => {
  const statusCode = 400;
  const errorSources : TErrorSources = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });
  return {
    statusCode,
    message: "Validation Error",
    errorSources,
  };
};

export default handleZodError;