import { Request, Response } from 'express';
import teamsService from '../services/teams.service';

const getAllTeams = async (req: Request, res: Response): Promise<Response> => {
  const teams = await teamsService.getAllTeams()
  return res.status(200).json(teams);
}

const getTeamById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const team = await teamsService.getTeamById(+id);
  return res.status(200).json(team);
}

export default {
  getAllTeams,
  getTeamById
}