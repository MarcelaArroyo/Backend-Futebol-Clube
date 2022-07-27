import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import Teams from './teams';

class Matches extends Model {
  id!:number;
  home_team!: number;
  home_team_goals!:number;
  away_team!:number;
  away_team_goals!:number;
  in_progress!:boolean;
}

Matches.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  home_team: {
    type: INTEGER,
    allowNull: false,
  },
  home_team_goals: {
    type: INTEGER,
    allowNull: false,
  },
  away_team: {
    type: INTEGER,
    allowNull: false,
  },
  away_team_goals: {
    type: INTEGER,
    allowNull: false,
  },
  in_progress: {
    type: BOOLEAN,
    allowNull: false,
  }
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Teams.belongsTo(Matches, {foreignKey: 'home_team', as: 'homeTeamM'});
Teams.belongsTo(Matches, {foreignKey: 'away_team', as: 'away_teamM'});

Matches.hasMany(Teams, {foreignKey: 'home_team', as: 'home_teamT'});
Matches.hasMany(Teams, {foreignKey: 'away_team', as: 'away_teamT'});

export default Matches;