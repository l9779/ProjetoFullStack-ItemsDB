const ICrud = require('../interfaces/interfaceCrud');

class ContextStrategy extends ICrud {
  constructor(strategy) {
    super();
    this._database = strategy;
  }

  create(item) {
    return this._database.create(item);
  }

  read(query, skip, limit) {
    return this._database.read(query, skip, limit);
  }

  update(id, item, upsert = false) {
    return this._database.update(id, item, upsert);
  }

  delete(id) {
    return this._database.delete(id);
  }

  deleteAll() {
    return this._database.deleteAll();
  }

  isConnected() {
    return this._database.isConnected();
  }

  static connect() {
    return this._database.connect();
  }
}

module.exports = ContextStrategy;
