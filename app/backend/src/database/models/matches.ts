import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import Teams from './teams';

class Matches extends Model {
  id!:number;
  homeTeam!: number;
  homeTeamGoals!:number;
  awayTeam!:number;
  awayTeamGoals!:number;
  inProgress!:boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeam: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeam: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  }
}, {
  modelName: 'matches',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });

Matches.belongsTo(Teams, {foreignKey: 'homeTeam', as: 'teamHome'});
Matches.belongsTo(Teams, {foreignKey: 'awayTeam', as: 'teamAway'});

export default Matches;