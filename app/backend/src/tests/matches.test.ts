import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Matches from '../database/models/matches';
import matchesService from '../services/matches.service';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// Matches Controller

describe('Testando matches.controller', () => {
  describe('Quando altera o inProgress de uma partida para false', () => {   
    it('Retorna status 200 e mensagem "Finished"', async () => {
      const { status, body } = await chai.request(app).patch('/matches/44/finish');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('Finished');
    });
  });
  describe('Quando encontra todas as partidas que não estão em progresso', () => {   
    it('Retorna status 200 e um array de partidas', async () => {
      const { status, body } = await chai.request(app).get('/matches/inProgress?q=false');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body[0]).to.be.an('object');
      expect(body[0]).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      expect(body[0].inProgress).to.be.equal(false);
    });
  });

  describe('Quando encontra todas as partidas que estão em progresso', () => {   
    it('Retorna status 200 e um array de partidas', async () => {
      const { status, body } = await chai.request(app).get('/matches/inProgress?q=true');
      expect(status).to.be.equal(200);
      expect(body).to.be.an('array');
      expect(body[0]).to.be.an('object');
      expect(body[0]).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      expect(body[0].inProgress).to.be.equal(true);
    });
  });
});



// Matches Service

describe('Testando matches.service', () => {
  describe('Quando altera o inProgress de uma partida para false', () => {
    const uptade: number[] | any = [1]

    before( async () => sinon.stub(Matches, 'update').resolves(uptade));
    after(() => (Matches.update as sinon.SinonStub).restore());

    it('Retorna um array com numero 1', async () => {
      const result = await matchesService.uptadeInProgress(1);
      expect(result).to.be.an('array');
      expect(result[0]).to.be.equal(1);
    })
  })

  describe('Quando encontra todas as partidas que não estão em progresso', () => {
    const matchesInProgress: any = [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: 'São Paulo'
        },
        teamAway: {
          teamName: 'Grêmio'
        }
      },
      {
        id: 2,
        homeTeam: 9,
        homeTeamGoals: 1,
        awayTeam: 14,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: 'Internacional'
        },
        teamAway: {
          teamName: 'Santos'
        }
     },
    ]

    before( async () => sinon.stub(Matches, 'findAll').resolves(matchesInProgress));
    after(() => (Matches.findAll as sinon.SinonStub).restore());

    it('Retorna um array de objetos e a propriedade inProgress é false', async () => {
      const result = await matchesService.getMatchesByProgress(false);
      expect(result).to.be.an('array');
      result.forEach((el) => {
        expect(el).to.be.an('object');
        expect(el).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
        expect(el.inProgress).to.be.equal(false);
      });
    });
  });

  describe('Quando encontra todas as partidas que estão em progresso', () => {
    const matchesInProgress: any = [
      {
        id: 41,
        homeTeam: 16,
        homeTeamGoals: 2,
        awayTeam: 9,
        awayTeamGoals: 0,
        inProgress: true,
        teamHome: {
          teamName: 'São Paulo'
        },
        teamAway: {
          teamName: 'Internacional'
        }
      },
      {
        id: 42,
        homeTeam: 6,
        homeTeamGoals: 1,
        awayTeam: 1,
        awayTeamGoals: 0,
        inProgress: true,
        teamHome: {
          teamName: 'Ferroviária'
        },
        teamAway: {
          teamName: 'Avaí/Kindermann'
        }
      },
    ]

    before( async () => sinon.stub(Matches, 'findAll').resolves(matchesInProgress));
    after(() => (Matches.findAll as sinon.SinonStub).restore());

    it('Retorna um array de objetos e a propriedade inProgress é true', async () => {
      const result = await matchesService.getMatchesByProgress(true);
      expect(result).to.be.an('array');
      result.forEach((el) => {
        expect(el).to.be.an('object');
        expect(el).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
        expect(el.inProgress).to.be.equal(true);
      });
    });
  });

  describe('Quando encontra todas as partidas', () => {
    const matches: any = [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: 'São Paulo'
        },
        teamAway: {
          teamName: 'Grêmio'
        }
      },
      {
        id: 2,
        homeTeam: 9,
        homeTeamGoals: 1,
        awayTeam: 14,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: 'Internacional'
        },
        teamAway: {
          teamName: 'Santos'
        }
     },
    ]

    before( async () => sinon.stub(Matches, 'findAll').resolves(matches));
    after(() => (Matches.findAll as sinon.SinonStub).restore());

    it('Retorna um array de objetos com as propriedades', async () => {
      const result = await matchesService.getAllMatches();
      expect(result).to.be.an('array');
      result.forEach((el) => {
        expect(el).to.be.an('object');
        expect(el).to.include.all.keys('id', 'homeTeam', 'homeTeamGoals', 'awayTeam', 'awayTeamGoals', 'inProgress', 'teamHome', 'teamAway');
      });
    });
  });
});