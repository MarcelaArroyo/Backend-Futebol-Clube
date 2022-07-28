import { Request, Response } from 'express';
import loginService from '../services/login.service';

const login = async (req: Request, res: Response): Promise<Response> => {
  const token = await loginService.authentication(req.body);
  if(!token) return res.status(401).json({message: 'Incorrect email or password'});
  return res.status(200).json({token});
}

export default {
  login,
}