const assert = require('assert');

const Context = require('../../db/strategies/base/contextStrategy');
const Postgres = require('../../db/strategies/postgres/Postgres');
const HeroisSchema = require('../../db/strategies/postgres/schemas/heroisSchema');

const MOCK_HEROI_CADASTRAR = {
  nome: 'Gaviao Negrio',
  poder: 'flecha',
};
const MOCK_HEROI_ATUALIZAR = {
  nome: 'Miranha',
  poder: 'teia',
};

let context = {};

describe('Suite de testes Postgres', function () {
  this.timeout(Infinity);

  this.beforeAll(async function () {
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, HeroisSchema);
    context = new Context(new Postgres(connection, model));

    await context.delete();
    await context.create(MOCK_HEROI_ATUALIZAR);
  });

  it('Verificar Conexão', async function () {
    const result = await context.isConnected();

    assert.equal(result, true);
  });

  it('Cadastrar', async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR);
    delete result.id;

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Listar', async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
    delete result.id;

    assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
  });

  it('Atualizar', async function () {
    const [itemAtualizar] = await context.read({
      nome: MOCK_HEROI_ATUALIZAR.nome,
    });

    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Homem-Aranha',
    };

    const [result] = await context.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id });

    assert.deepEqual(result, 1);
    assert.deepEqual(itemAtualizado.nome, novoItem.nome);
  });

  it('Remover', async function () {
    const [item] = await context.read({});
    const result = await context.delete(item.id);

    assert.deepEqual(result, 1);
  });
});
