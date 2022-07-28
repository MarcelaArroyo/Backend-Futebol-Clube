import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import IPayload from '../interfaces/payload.interface';

const SECRET: string | undefined = `${process.env.JWT_SECRET}`

const jwtConfig: jwt.SignOptions = {
  expiresIn: '1d',
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