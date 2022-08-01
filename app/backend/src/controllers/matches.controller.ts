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

  if (!savedMatche) return res.status(404).json({ message: 'There is no team with such id!' });
  
  return res.status(201).json(savedMatche);
}

const uptadeInProgress = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const result = await matchesService.uptadeInProgress(+id);

  if (result[0] > 0) {
    return res.status(200).json({ message: 'Finished'});
  }

  return res.status(404).json({ message: 'Not finished'});
}

export default {
  getAllMatches,
  getMatchesByProgress,
  saveMatche,
  uptadeInProgress,
}