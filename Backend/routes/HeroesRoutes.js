const Joi = require('joi');
const Boom = require('@hapi/boom');

const BaseRoute = require('./BaseRoute');

const failAction = (request, header, error) => {
  throw error;
};
const headers = Joi.object({
  authorization: Joi.string().required(),
}).unknown();

class HeroesRoutes extends BaseRoute {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      path: `/herois/list`,
      method: 'GET',
      options: {
        auth: false, // por padrão a app requer auth, nessa rota eu tenho que especificar que não precisa.
        tags: ['api'],
        description: 'Deve listar items',
        notes: 'pode paginar resultados e filtrar por nome',
        validate: {
          failAction,
          query: Joi.object({
            skip: Joi.number().integer().default(0),
            limit: Joi.number().integer().default(1000),
            nome: Joi.string().min(3).max(100),
          }),
        },
      },
      handler: (request) => {
        try {
          const { nome, skip, limit } = request.query;
          let query = nome
            ? {
                nome: {
                  // qualquer nome que conter a string da query
                  $regex: `.*${nome}*.`,
                },
              }
            : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          console.log('GET Error', error);
          return Boom.internal();
        }
      },
    };
  }

  create() {
    return {
      path: '/herois/post',
      method: 'POST',
      options: {
        tags: ['api'],
        description: 'Deve registrar items',
        notes: 'Deve registrar item com nome e poder',
        validate: {
          failAction,
          headers,
          payload: Joi.object({
            nome: Joi.string().required().min(3).max(100),
            poder: Joi.string().required().min(2).max(60),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { nome, poder } = request.payload;
          const result = await this.db.create({ nome, poder });
          return {
            message: 'Item cadastrado com sucesso!',
            _id: result._id,
          };
        } catch (error) {
          console.log('POST Error: ', error);
          return Boom.internal();
        }
      },
    };
  }

  update() {
    return {
      path: '/herois/update/{id}',
      method: 'PATCH',
      options: {
        tags: ['api'],
        description: 'Deve atualizar items',
        notes: 'Pode atualizar items por nome e poder',
        validate: {
          failAction,
          headers,
          params: Joi.object({
            id: Joi.string().required(),
          }),
          payload: Joi.object({
            nome: Joi.string().min(3).max(100),
            poder: Joi.string().min(2).max(60),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;
          const { payload } = request;
          const dadosString = JSON.stringify(payload);
          // cria obj somente com atributos que tem valores
          const dados = JSON.parse(dadosString);
          const result = await this.db.update(id, dados);

          return result.modifiedCount === 1
            ? { message: 'Item atualizado com sucesso!' }
            : Boom.preconditionFailed('Id não encontrado no banco.');
        } catch (error) {
          console.log('PATCH Error: ', error);
          return Boom.internal();
        }
      },
    };
  }

  delete() {
    return {
      path: '/herois/delete/{id?}',
      method: 'DELETE',
      options: {
        tags: ['api'],
        description: 'Deve deletar items',
        notes: 'Pode deletar itens por id',
        validate: {
          failAction,
          headers,
          params: Joi.object({
            id: Joi.string(),
          }),
        },
      },
      handler: async (request) => {
        try {
          const { id } = request.params;

          const result = await this.db.delete(id);

          return result.deletedCount === 1
            ? { message: 'Item deletado com sucesso.' }
            : Boom.preconditionFailed('Id não encontrado no banco.');
        } catch (error) {
          console.error('DELETE Error');
          return Boom.internal();
        }
      },
    };
  }

  deleteAll() {
    return {
      path: '/herois/deleteAll',
      method: 'DELETE',
      options: {
        tags: ['api'],
        description: 'Deve deletar todos os items',
        notes: 'Pode deletar todos os itens.',
        validate: {
          failAction,
          headers,
        },
      },
      handler: async (request) => {
        try {
          const result = await this.db.deleteAll();
          console.log(result);

          return result.acknowledged
            ? { message: `${result.deletedCount} items deletados.` }
            : Boom.preconditionFailed('Algo de errado não está certo.');
        } catch (error) {
          console.error('DELETE ALL Error', error);
          return Boom.internal();
        }
      },
    };
  }
}

module.exports = HeroesRoutes;
