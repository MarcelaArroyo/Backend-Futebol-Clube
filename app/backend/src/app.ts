import * as express from 'express';
import loginController from './controllers/login.controller';
import teamsController from './controllers/teams.controller';
import matchesController from './controllers/matches.controller';
import leaderboardController from './controllers/leaderboard.controller';
import validationLogin from './middlewares/login.middleware';
import validationToken from './middlewares/token.middleware';
import validationSaveMatche from './middlewares/saveMatche.middleware'

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
    this.app.post('/login', validationLogin, loginController.login);
    this.app.get('/login/validate', validationToken.tokenLogin, loginController.loginValidate);
    this.app.get('/teams', teamsController.getAllTeams);
    this.app.get('/teams/:id', teamsController.getTeamById);
    this.app.get('/matches', matchesController.getAllMatches);
    // localhost:3001/matches/inProgress?q=false
    this.app.get('/matches/inProgress', matchesController.getMatchesByProgress);
    this.app.post('/matches', validationToken.tokenMatches, validationSaveMatche, matchesController.saveMatche);
    this.app.patch('/matches/:id/finish', matchesController.uptadeInProgress);
    this.app.patch('/matches/:id', matchesController.uptadeTeamGoals);
    this.app.get('/leaderboard/home', leaderboardController.learderboard);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
