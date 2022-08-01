import Teams from '../database/models/teams';
import Matches from '../database/models/matches';

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

export default {
  getAllMatches,
  getMatchesByProgress
}