const assert = require('assert');

const PasswordHelper = require('../helpers/PasswordHelper');

const SENHA = '$enh@123';
const HASH = '$2b$04$BVC4zfMJvwF2MeMNsBgy3O5TuzIfle412K5GzkRcIVNACV/RFXRPC';

describe('Suite de teste UserHelper', function () {
  it('Deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA);

    assert.ok(result.length > 10);
  });

  it('Comparar uma senha e seu hash', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);

    assert.ok(result);
  });
});
