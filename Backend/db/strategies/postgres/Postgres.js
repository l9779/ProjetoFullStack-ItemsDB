const Sequelize = require('sequelize');
const ICrud = require('../interfaces/interfaceCrud');

class Postgres extends ICrud {
  constructor(connection, schema) {
    super();

    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.log('Connection Error:', error);
      return false;
    }
  }

  static async connect() {
    const connection = new Sequelize(process.env.POSTGRES_URL, {
      operatorAliases: false,
      logging: false,
      quoteIdentifiers: false,
      ssl: process.env.SSL_DB,
      dialectOption: {
        ssl: process.env.SSL_DB,
      },
    });

    return connection;
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  async create(item) {
    const { dataValues } = await this._schema.create(item, { raw: true });
    return dataValues;
  }

  async read(query = {}) {
    return this._schema.findAll({ where: query, raw: true });
  }

  async update(id, item, upsert = false) {
    // upsert -> se o id passado não for encontrado, insere os dados na tabela em vez de atualizar
    // nõa funciona por algum motivo
    // const fn = upsert ? 'upsert' : 'update';
    // return this._schema[fn](item, { where: { id: id } });

    if (upsert) return await this._schema.create(item, { raw: true });
    else return await this._schema.update(item, { where: { id } });
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }
}

module.exports = Postgres;
