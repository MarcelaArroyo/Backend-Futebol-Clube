import Users from '../database/models/users';
import ILogin from '../interfaces/login.interface';
import IPayload from '../interfaces/payload.interface';
import * as bcrypt from 'bcryptjs';
import generateToken from '../utils/JWToken';

const authentication = async (login:ILogin) => {
  const { email, password } = login;
  const user = await Users.findOne({
    where: { email },
  });

  if(!user) return undefined;

  const verifyPassword = bcrypt.compareSync(password, user.password);
  if(!verifyPassword) return undefined;

  const payload: IPayload = {
    id: user.id,
    username: user.username,
    role: user.role,
    email: user.email,
  };

  const token = generateToken.generateToken(payload);
  return token;
}

export default {
  authentication
}