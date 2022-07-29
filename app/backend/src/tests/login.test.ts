import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/users';
import loginService from '../services/login.service';
import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/user.interface';

import { app } from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

// Login validate controller

describe('Testando loginValidate.controller', () => {
  describe('Quando o token não é passado', () => {

    it('Retorna status 401 e uma mensagem "Token not found"', async () => {
      const { status, body } = await chai.request(app).get('/login/validate');
      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('Token not found');
    });
  });

  describe('Quando o token é incorreto', () => {

    it('Retorna status 401 e uma mensagem "Token not found"', async () => {
      const { status, body } = await chai.request(app).get('/login/validate').set('authorization', 'tokenIncorreto');
      expect(status).to.be.equal(401);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('Token not found');
    });
  });

  describe('Quando o token é correto', () => {
    const login = {email: 'admin@admin.com', password: 'secret_admin'};

    it('Retorna status 200 e o role do usuário"', async () => {
      const token = await loginService.authentication(login);
      const { status, body } = await chai.request(app).get('/login/validate').set('authorization', `${token}`);
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('role');
      expect(body.role).to.be.equal('admin');
    });
  });
});

// Login controller

describe('Testando login.controller', () => {

  describe('Quando o email não existe', () => {
    const login = {email: '', password: 'secret_admin'};    

    it('Retorna status 400 e mensagem "All fields must be filled"', async () => {
      const { status, body } = await chai.request(app).post('/login').send(login);
      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Quando o email é inválido', () => {
    const login = {email: 'emailInvalido', password: 'secret_admin'};    

    it('Retorna status 422 e mensagem "Email field must receive a valid email"', async () => {
      const { status, body } = await chai.request(app).post('/login').send(login);
      expect(status).to.be.equal(422);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('Email field must receive a valid email');
    });
  });

  describe('Quando a password não existe', () => {
    const login = {email: 'admin@admin.com', password: ''};   

    it('Retorna status 400 e mensagem "All fields must be filled"', async () => {
      const { status, body } = await chai.request(app).post('/login').send(login);
      expect(status).to.be.equal(400);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('All fields must be filled');
    });
  });

  describe('Quando a password é menor que 6 caracteres', () => {
    const login = {email: 'admin@admin.com', password: '12345'};   

    it('Retorna status 422 e mensagem "Password field must be long than 6 characters"', async () => {
      const { status, body } = await chai.request(app).post('/login').send(login);
      expect(status).to.be.equal(422);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('Password field must be long than 6 characters');
    });
  });


  describe('Quando o email e senha do usuário estão incorretos', () => {
    const login = {email: 'admin@admin.com', password: 'test123'};

    before(async () => sinon.stub(loginService, 'authentication').resolves(undefined));
    after(() => (loginService.authentication as sinon.SinonStub).restore());

    it('Retorna status 404 e mensagem "Incorrect email or password"', async () => {
      const { status, body } = await chai.request(app).post('/login').send(login);
      expect(status).to.be.equal(404);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('message');
      expect(body.message).to.be.equal('Incorrect email or password');
    });
  });

  describe('Quando o email e senha do usuário estão corretos', () => {
    const login = {email: 'admin@admin.com', password: 'secret_admin'};
    const token = 'token';

    before(async () => sinon.stub(loginService, 'authentication').resolves(token));
    after(() => (loginService.authentication as sinon.SinonStub).restore());

    it('Retorna status 200 e o token', async () => {
      const { status, body } = await chai.request(app).post('/login').send(login);
      expect(status).to.be.equal(200);
      expect(body).to.be.an('object');
      expect(body).to.include.all.keys('token');
    });
  });
});


// Login Service

describe('Testando login.service', () => {
  describe('Quando o email do usuário é incorreto', () => {
    const login = {email: 'test@test.com', password: 'test123'};

    before( async () => sinon.stub(Users, 'findOne').resolves(null));
    after(() => (Users.findOne as sinon.SinonStub).restore());

    it('Retorna undefined', async () => {
      const result = await loginService.authentication(login);
      expect(result).to.be.undefined;
    });
  });

  describe('Quando a senha do usuário é incorreta', () => {
    const login = {email: 'admin@admin.com', password: 'test123'};

    before(() => sinon.stub(bcrypt, 'compareSync').returns(false));
    after(() => (bcrypt.compareSync as sinon.SinonStub).restore());

    it('Retorna undefined', async () => {
      const result = await loginService.authentication(login);
      expect(result).to.be.undefined;
    });
  });

  describe('Quando email e senha do usuário estão corretos', () => {
    const login = {email: 'admin@admin.com', password: 'secret_admin'};
    const user: IUser | any = {
      id: 1,
      username: 'Admin',
      role: 'admin',
      email: 'admin@admin.com',
      password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }

    before(async () => {
      sinon.stub(Users, 'findOne').resolves(user)
      sinon.stub(bcrypt, 'compareSync').returns(true)
    });
    after(() => {
      (Users.findOne as sinon.SinonStub).restore(),
      (bcrypt.compareSync as sinon.SinonStub).restore()
    });

    it('Retorna um token', async () => {
      const result = await loginService.authentication(login);
      expect(result).to.be.an('string');
    });
  });
});
