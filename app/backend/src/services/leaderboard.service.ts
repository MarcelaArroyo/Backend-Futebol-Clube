import db from '../database/models';
import queryMySQL from '../utils/queryMySQL';

const leaderboardHome = async () => {
  const [result] = await db.query(queryMySQL);
  return result;
}

export default {
  leaderboardHome
}