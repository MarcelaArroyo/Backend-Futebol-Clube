import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Teams extends Model {
  id!:number;
  team_name!: string;
}

Teams.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  team_name: {
    type: STRING(50),
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default Teams;