import type { NextFunction, Request, Response } from "express";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  // Log error for debugging
  if (err.statusCode === 500) {
    console.error('ERROR 💥', err);
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'An unknown error occurred',
    // Stack trace only in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
