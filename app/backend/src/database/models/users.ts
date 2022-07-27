import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Users extends Model {
  id!:number;
  username!: string;
  role!:string;
  email!:string;
  password!:string;
}

Users.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING(50),
    allowNull: false,
  },
  role: {
    type: STRING(50),
    allowNull: false,
  },
  email: {
    type: STRING(30),
    allowNull: false,
  },
  password: {
    type: STRING(50),
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Users;