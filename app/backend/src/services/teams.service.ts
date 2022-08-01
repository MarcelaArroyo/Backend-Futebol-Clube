import Teams from '../database/models/teams';

const getAllTeams = async (): Promise<Teams[]> => {
  const teams = await Teams.findAll();

  return teams;
}

const getTeamById = async (id: number): Promise<Teams | null> => {
  const team = await Teams.findOne({
    where: { id }
  });

  return team;
}

export default {
  getAllTeams,
  getTeamById
}