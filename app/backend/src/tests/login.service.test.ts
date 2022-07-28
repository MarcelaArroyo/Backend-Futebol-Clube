import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import Users from '../database/models/users';
import loginService from '../services/login.service';
import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/user.interface';

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

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

    after(() => (bcrypt.compareSync as sinon.SinonStub).restore());

    it('Retorna um token', async () => {
      const result = await loginService.authentication(login);
      expect(result).to.be.an('string');
    });
  });
});
