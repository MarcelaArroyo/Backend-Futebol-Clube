import { Request, Response } from 'express';
import learderboardService from '../services/leaderboard.service';

const learderboard = async (req: Request, res: Response): Promise<Response> => {
  const result = await learderboardService.leaderboardHome();
  return res.status(200).json(result);
}

export default {
  learderboard,
}