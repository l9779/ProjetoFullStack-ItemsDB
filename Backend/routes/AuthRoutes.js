const Joi = require('joi');
const Boom = require('@hapi/boom');
const Jwt = require('jsonwebtoken');

const BaseRoute = require('./BaseRoute');
const PasswordHelper = require('./../src/helpers/PasswordHelper');

const failAction = (request, header, error) => {
  throw error;
};

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super();

    this.secret = secret;
    this.db = db;
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      options: {
        auth: false,
        tags: ['api'],
        description: 'Obter Token',
        notes: 'faz login com user e senha do banco',
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
          }),
        },
      },
      handler: async (request) => {
        const { username, password } = request.payload;
        const [usuario] = await this.db.read({
          username: username.toLowerCase(),
        });

        if (!usuario)
          return Boom.unauthorized('O usuário informado não existe.');

        const match = PasswordHelper.comparePassword(
          password,
          usuario.password
        );

        if (!match) return Boom.unauthorized('Usuário ou senha incorreto!');

        return { token: Jwt.sign({ username, id: usuario.id }, this.secret) };
      },
    };
  }
}

module.exports = AuthRoutes;
