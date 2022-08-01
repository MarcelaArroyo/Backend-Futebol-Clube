import Teams from '../database/models/teams';
import Matches from '../database/models/matches';
import IMatche from '../interfaces/matche.interface';

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

const saveMatche = async (matche: IMatche): Promise<Matches> => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = matche;
  
  const savedMatche = await Matches.create({
    homeTeam,
    homeTeamGoals,
    awayTeam,
    awayTeamGoals,
    inProgress: true,
  });
  
  return savedMatche;
};



export default {
  getAllMatches,
  getMatchesByProgress,
  saveMatche
}