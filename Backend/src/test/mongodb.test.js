const assert = require('assert');

const Context = require('../../db/strategies/base/contextStrategy');
const MongoDB = require('../../db/strategies/mongodb/mongodb');
const HeroiSchema = require('../../db/strategies/mongodb/schemas/heroisSchema');

const MOCK_ITEM_CADASTAR = {
  nome: 'Item Cadastrado',
  poder: 'Porra',
};
const MOCK_ITEM_ATUALIZAR = {
  nome: 'Item Para Atualizar',
  poder: 'Uerroa',
};
let MOCK_ITEM_ID = '';

let context = {};

describe('Suite de testes MongoDB', function () {
  this.beforeAll(async () => {
    const connection = MongoDB.connect();
    context = new Context(new MongoDB(connection, HeroiSchema));

    const result = await context.create(MOCK_ITEM_ATUALIZAR);
    MOCK_ITEM_ID = result._id;
  });

  it('Verificar conexão', async () => {
    const result = await context.isConnected();

    assert.deepEqual(result, 'Conectado');
  });

  it('Cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_ITEM_CADASTAR);
    assert.deepEqual({ nome, poder }, MOCK_ITEM_CADASTAR);
  });

  it('Listar', async () => {
    const [{ nome, poder }] = await context.read({
      nome: MOCK_ITEM_CADASTAR.nome,
    });
    const result = { nome, poder };

    assert.deepEqual(result, MOCK_ITEM_CADASTAR);
  });

  it('Atualizar', async () => {
    const result = await context.update(MOCK_ITEM_ID, {
      poder: 'Poder Atualizado',
    });

    assert.deepEqual(result.modifiedCount, 1);
  });

  it('Remover', async () => {
    const result = await context.delete(MOCK_ITEM_ID);

    assert.deepEqual(result.deletedCount, 1);
  });
});
