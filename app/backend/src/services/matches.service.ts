import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import IMatche from '../interfaces/matche.interface';
import { Op } from 'sequelize';

const getAllMatches = async (): Promise<Matches[]> => {
  const matches = await Matches.findAll({
    include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
  });

  return matches;
};

const getMatchesByProgress = async (inProgress: boolean): Promise<Matches[]> => {
  const matches = await Matches.findAll({
    where: { inProgress },
    include: [{ model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
      { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } }],
  });

  return matches;
};

const saveMatche = async (matche: IMatche): Promise<Matches | undefined> => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matche;

  const hasTeam: Teams[] = await Teams.findAll({
    where: {
      [Op.or]: [
        {id: homeTeam},
        {id: awayTeam}
      ]
    }
  });
  
  if (hasTeam.length !== 2) return undefined;
  
  const savedMatche = await Matches.create({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress: true,
  });
  
  return savedMatche;
};

const uptadeInProgress = async (id: number): Promise<[number, Matches[]]> => {
  const result = await Matches.update({
    inProgress: false,
  },
  {
  where: { id }
  });

  return result
};



export default {
  getAllMatches,
  getMatchesByProgress,
  saveMatche,
  uptadeInProgress
}