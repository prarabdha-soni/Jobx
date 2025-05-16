import { Request, Response, NextFunction } from 'express';

declare global {
  namespace Express {
    interface Request {
      body: any;
    }
  }
}

export type RequestHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any> | any; 