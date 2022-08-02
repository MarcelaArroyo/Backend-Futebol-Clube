import { Request, Response, NextFunction } from 'express';
import verifyToken from '../utils/JWToken';

const tokenLogin = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  const payload = await verifyToken.verifyToken(token);
  

  if (!payload) return res.status(401).json({ message: 'Token not found' });

  res.locals.payload = payload;

  next();
}

const tokenMatches = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  const payload = await verifyToken.verifyToken(token);
  

  if (!payload) return res.status(401).json({ message: 'Token must be a valid token' });

  res.locals.payload = payload;

  next();
}

export default {
  tokenLogin,
  tokenMatches
};