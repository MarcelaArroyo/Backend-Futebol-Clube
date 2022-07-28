import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import IPayload from '../interfaces/payload.interface';

const SECRET = process.env.JWT_SECRET || 'sdfa*(*bB7657V6$%$%463DCSSjkbhhj'

const jwtConfig: jwt.SignOptions = {
  expiresIn: '8h',
  algorithm: 'HS256',
};

const generateToken = (payload: Omit<IPayload, 'password'>) => jwt.sign({ data: payload }, SECRET, jwtConfig);

const verifyToken = async (token: string | undefined):
Promise<string | jwt.JwtPayload | undefined> => {
  if (!token) return undefined;

  try {
    const verify = jwt.verify(token, SECRET);
    return verify;
  } catch (error) {
    return undefined;
  }
}

export default {
  generateToken,
  verifyToken
}