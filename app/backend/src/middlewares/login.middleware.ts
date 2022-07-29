import { Request, Response, NextFunction } from "express";

const validationLogin = (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  const regexEmail = /\S+@\S+\.\S+/;

  if(!email || email === '') return res.status(400).json({message: 'All fields must be filled'});
  if(!regexEmail.test(email)) return res.status(422).json({message: 'Email field must receive a valid email'});
  if(!password || password === '') return res.status(400).json({message: 'All fields must be filled'});
  if(password.length < 6) return res.status(422).json({message: 'Password field must be long than 6 characters'});

  next();
}

export default validationLogin;