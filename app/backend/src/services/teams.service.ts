import Teams from '../database/models/teams';
import ITeam from '../interfaces/ITeam';

const getAllTeams = async (): Promise<ITeam[]> => {
  const teams = await Teams.findAll();
  const result: ITeam[] = teams.map((team) => {
    return {
      id: +team.id,
      teamName: team.team_name,
    }
  });

  return result as ITeam[]
}

export default {
  getAllTeams,
}