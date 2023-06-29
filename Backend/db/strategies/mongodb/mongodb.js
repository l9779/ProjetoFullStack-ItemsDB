const ICrud = require('../interfaces/interfaceCrud');
const Mongoose = require('mongoose');

const CONNECTION_STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectando',
};

class MongoDB extends ICrud {
  constructor(connection, schema) {
    super();

    this._schema = schema;
    this._connection = connection;
  }

  static connect() {
    try {
      Mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
      });
    } catch (error) {
      console.log('Falha na conexão!', error);
    }

    const connection = Mongoose.connection;

    connection.once('open', () =>
      console.log('MongoDB conectado com Sucesso!')
    );

    return connection;
  }

  async isConnected() {
    const state = CONNECTION_STATUS[this._connection.readyState];

    if (state !== 'Conectando') return state;

    await new Promise((res) => setTimeout(res, 1000));
    return CONNECTION_STATUS[this._connection.readyState];
  }

  create(item) {
    return this._schema.create(item);
  }

  read(query, skip = 0, limit = 10) {
    return this._schema.find(query).skip(skip).limit(limit);
  }

  update(id, item) {
    return this._schema.updateOne({ _id: id }, { $set: item });
  }

  delete(id) {
    return id ? this._schema.deleteOne({ _id: id }) : this._schema.deleteAll();
  }
}

module.exports = MongoDB;
