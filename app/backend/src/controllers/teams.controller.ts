import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (req: Request, res: Response): Promise<Response> => {
  const teams = await teamsService.getAllTeams()
  return res.status(200).json(teams);
}

export default {
  getAllTeams,
}