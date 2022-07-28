import { NextFunction, Request, Response } from 'express';
import HttpExeception from '../class/http.exeception';

const httpErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const { status, message } = err as HttpExeception;

  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;