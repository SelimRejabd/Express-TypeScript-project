/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const errorMessage = error.message || "Somthing went wrong.";

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    error: error,
  });
};

export default globalErrorHandler;