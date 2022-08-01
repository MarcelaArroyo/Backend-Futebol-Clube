import { Request, Response } from 'express';
import matchesService from '../services/matches.service';

const getAllMatches = async (req: Request, res: Response): Promise<Response> => {
  const matches = await matchesService.getAllMatches();
  return res.status(200).json(matches);
}

const getMatchesByProgress = async (req: Request, res: Response): Promise<Response> => {
  const { q: inProgress } = req.query

  const progress = Boolean(inProgress === 'true');
  
  const matches = await matchesService.getMatchesByProgress(progress)
  return res.status(200).json(matches);
}

const saveMatche = async (req: Request, res: Response): Promise<Response> => {
  const savedMatche = await matchesService.saveMatche(req.body);
  return res.status(201).json(savedMatche);
}

export default {
  getAllMatches,
  getMatchesByProgress,
  saveMatche,
}