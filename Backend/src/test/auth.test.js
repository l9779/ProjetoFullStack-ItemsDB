const assert = require('assert');

const api = require('../api');
const Context = require('./../../db/strategies/base/contextStrategy');
const Postgres = require('../../db/strategies/postgres/Postgres');
const usuariosSchema = require('./../../db/strategies/postgres/schemas/usuariosSchema');

let app = {};
const USER = {
  username: 'Joaozinho',
  password: '123',
};
const USER_NO_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$W2sqduVvBjtU9FXuxFFdnu7yybBm13Jv1vU1TrcEE4DMlO/zH0Wcq',
};

describe('Suite de teste Auth', function () {
  this.beforeAll(async () => {
    app = await api;

    const connectionPostgres = await Postgres.connect();
    const model = await Postgres.defineModel(
      connectionPostgres,
      usuariosSchema
    );
    const contextPostgres = new Context(
      new Postgres(connectionPostgres, model)
    );
    // null para não achar um registro de propósito
    // USER_NO_DB são os dados que devem ser colocados no db
    // true para marcar a opção 'upsert'
    await contextPostgres.update(null, USER_NO_DB, true);
  });

  it('Receber Token ao fazer login com usuário cadastrado no banco.', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER,
    });
    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });

  it('Deve retornar não autorizado ao tentar obter um token com login errado.', async () => {
    const INVALID_USER = { username: 'LittleJohnny', password: '321' };
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: INVALID_USER.username.toLowerCase(),
        password: INVALID_USER.password,
      },
    });
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 401);
    assert.deepEqual(JSON.parse(result.payload).error, 'Unauthorized');
  });
});
