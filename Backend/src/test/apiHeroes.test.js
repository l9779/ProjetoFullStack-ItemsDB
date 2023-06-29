const assert = require('assert');

const api = require('./../api');

let app = {};
const headers = {
  Authorization:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkpvYW96aW5obyIsImlkIjoxLCJpYXQiOjE2ODY4NTE2MDh9.oY-aiWPihd8hKNq4szgFmRc3JAol0dXUcfcrgzwVmUM',
};
const MOCK_ITEM_CADASTRAR = { nome: 'Item api cadastrar', poder: 'Fumar' };
const MOCK_ITEM_ATUALIZAR = { nome: 'Mude meu nome', poder: 'Mude meu poder' };
let MOCK_ID_ATUALIZAR = '';

describe('Suite de testes api', function () {
  this.beforeAll(async () => {
    app = await api;

    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      headers,
      payload: JSON.stringify(MOCK_ITEM_ATUALIZAR),
    });
    const dados = JSON.parse(result.payload);
    MOCK_ID_ATUALIZAR = dados._id;
  });

  it('Listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      headers,
      url: '/herois?skip=0&limit=0',
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  const TAMANHO_LIMITE = 3;
  it(`Listar /herois - deve listar somente ${TAMANHO_LIMITE} itens`, async () => {
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === TAMANHO_LIMITE);
  });

  it('Listar /herois - retornar um erro com tipo de limit incorreto', async () => {
    const QUERY_ERRADO = 'olhaacoisa';
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=${QUERY_ERRADO}`,
    });

    const errorPayload = {
      statusCode: 400,
      error: 'Bad Request',
      message: '"limit" must be a number',
      validation: { source: 'query', keys: ['limit'] },
    };

    assert.deepEqual(errorPayload.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorPayload));
  });

  it(`Listar /herois - filtrar itens por nome`, async () => {
    const NOME = 'Miranha';
    const result = await app.inject({
      method: 'GET',
      headers,
      url: `/herois?skip=0&limit=100&nome=${NOME}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, NOME);
  });

  it('Cadastrar /herois ', async () => {
    const result = await app.inject({
      method: 'POST',
      url: `/herois`,
      headers,
      payload: JSON.stringify(MOCK_ITEM_CADASTRAR),
    });

    const statusCode = result.statusCode;
    const { message, _id } = await JSON.parse(result.payload);

    assert.ok(statusCode, 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, 'Item cadastrado com sucesso!');
  });

  it('Atualizar /herois/:id', async () => {
    const _id = MOCK_ID_ATUALIZAR;
    const expected = { poder: 'Murder' };

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      headers,
      payload: JSON.stringify(expected),
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, 'Item atualizado com sucesso!');
  });

  it('Atualizar /herois/:id - não deve atualizar id inexistente', async () => {
    let _id = MOCK_ID_ATUALIZAR;
    _id[2] = 'A';

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      headers,
      payload: JSON.stringify({ poder: 'Murder' }),
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const expected = {
      statusCode: 412,
      error: 'Precondition Failed',
      message: 'Id não encontrado no banco.',
    };
    assert.ok(statusCode === 412);
    assert.deepEqual(dados, expected);
  });

  it('Remover /herois/:id', async () => {
    const _id = MOCK_ID_ATUALIZAR;
    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.ok(statusCode === 200);
    assert.deepEqual(dados.message, 'Item deletado com sucesso.');
  });

  it('Remover /herois/:id - não deve remover id inexistente', async () => {
    let _id = MOCK_ID_ATUALIZAR;
    _id[2] = 'A';

    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const expected = {
      statusCode: 412,
      error: 'Precondition Failed',
      message: 'Id não encontrado no banco.',
    };

    assert.ok(statusCode === 412);
    assert.deepEqual(dados, expected);
  });

  it('Remover /herois/:id - não deve remover id inválido', async () => {
    let _id = 'ID_INVALIDO_PQP';

    const result = await app.inject({
      method: 'DELETE',
      headers,
      url: `/herois/${_id}`,
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);
    const expected = {
      statusCode: 500,
      error: 'Internal Server Error',
      message: 'An internal server error occurred',
    };

    assert.ok(statusCode === 500);
    assert.deepEqual(dados, expected);
  });
});
