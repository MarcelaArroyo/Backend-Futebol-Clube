const queryMySQL = `SELECT
  T.team_name as "name",
  (3 * SUM(home_team_goals > away_team_goals))
  + SUM(home_team_goals = away_team_goals) AS "totalPoints",
  COUNT(*) as "totalGames",
  SUM(home_team_goals > away_team_goals) as "totalVictories",
  SUM(home_team_goals = away_team_goals) as "totalDraws",
  SUM(home_team_goals < away_team_goals) as "totalLosses",
  SUM(home_team_goals) as "goalsFavor",
  SUM(away_team_goals) as "goalsOwn",
  SUM(home_team_goals) - SUM(away_team_goals) as "goalsBalance",
  ROUND((((3 * SUM(home_team_goals > away_team_goals) + SUM(home_team_goals = away_team_goals))
  / (COUNT(*) * 3)) * 100), 2) as "efficiency"
  FROM
    TRYBE_FUTEBOL_CLUBE.matches AS M
  JOIN
    TRYBE_FUTEBOL_CLUBE.teams AS T
    ON
  M.home_team = T.id
  WHERE
    M.in_progress = 0
  GROUP BY
    M.home_team
  ORDER BY
    (3 * SUM(home_team_goals > away_team_goals)) + SUM(home_team_goals = away_team_goals) desc,
    SUM(home_team_goals) - SUM(away_team_goals) desc,
    SUM(home_team_goals) desc,
    SUM(away_team_goals) desc;`;

export default queryMySQL;