import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getAllTeams = async (req: Request, res: Response): Promise<Response> => {
  const matches = await matchesService.getAllMatches();
  return res.status(200).json(matches);
}

export default {
  getAllTeams,
}