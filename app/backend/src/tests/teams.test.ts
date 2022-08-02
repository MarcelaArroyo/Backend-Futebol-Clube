import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Teams from '../database/models/teams';
import ITeam from '..//interfaces/ITeam';
import teamsService from '../services/teams.service';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// Teams Controller

describe('Testando teams.controller', () => {
  describe('Quando encontra um time pelo id', () => {   
    it('Retorna status 200 e um objeto com as propriedades "id" e "teamName"', async () => {
      const { status, body } = await chai.request(app).get('/teams/1');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('id', 'teamName');
    });
  });

  describe('Quando encontra todos os times', () => {   
    it('Retorna status 200 e um array de times', async () => {
      const { status, body } = await chai.request(app).get('/teams');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body[0]).to.be.an('object');
      expect(body[0]).to.include.all.keys('id', 'teamName');
    });
  });
});



// Teams Service

describe('Testando teams.service', () => {
  describe('Quando encontra um time pelo id', () => {
    const team: ITeam | any = {
      id: 1,
      teamName: 'Avaí/Kindermann'
    }

    before( async () => sinon.stub(Teams, 'findOne').resolves(team));
    after(() => (Teams.findOne as sinon.SinonStub).restore());

    it('Retorna um objeto com as propriedades "id" e "teamName"', async () => {
      const result = await teamsService.getTeamById(1);
      expect(result).to.be.an('object');
      expect(result).to.include.all.keys('id', 'teamName');
    });

  });

  describe('Quando encontra todos os times', () => {
    const teams: ITeam[] | any = [
      {
        "id": 1,
        "teamName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "teamName": "Bahia"
      },
      {
        "id": 3,
        "teamName": "Botafogo"
      },
    ]

    before( async () => sinon.stub(Teams, 'findAll').resolves(teams));
    after(() => (Teams.findAll as sinon.SinonStub).restore());

    it('Retorna um array de objetos com as propriedades "id" e ""teamName"', async () => {
      const result = await teamsService.getAllTeams();
      expect(result).to.be.an('array');
      result.forEach((el) => {
        expect(el).to.be.an('object');
        expect(el).to.include.all.keys('id', 'teamName');
      })
    });
  });
});
