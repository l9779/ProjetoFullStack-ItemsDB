const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');
const Hapi = require('@hapi/hapi');
const HapiSwagger = require('hapi-swagger');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiJwt = require('hapi-auth-jwt2');

const Context = require('../db/strategies/base/contextStrategy');
const MongoDb = require('../db/strategies/mongodb/mongodb');
const Postgres = require('../db/strategies/postgres/Postgres');
const HeroisSchema = require('../db/strategies/mongodb/schemas/heroisSchema');
const usuariosSchema = require('../db/strategies/postgres/schemas/usuariosSchema');
const HeroesRoutes = require('../routes/HeroesRoutes');
const AuthRoutes = require('../routes/AuthRoutes');
const UtilRoutes = require('../routes/UtilRoutes');
const Pack = require('../package.json');

const env = process.env.NODE_ENV || 'dev';
ok(env === 'prod' || env === 'dev', 'A env é inválida.');

const configPath = join(__dirname, '../config', `.env.${env}`);
config({ path: configPath });

const app = new Hapi.Server({
  port: process.env.PORT,
  routes: {
    cors: {
      // headers: ['Accept', 'Content-type'],
      origin: [`${process.env.CORS_ORIGIN}`],
      // additionalHeaders: ['X-Requested-With'],
    },
  },
});
const JWT_SECRET = process.env.JWT_KEY;

function mapRoutes(instance, methods) {
  // retorna todos os metodos da instância que não são construtores ou privados
  return methods.map((method) => instance[method]());
}

async function main() {
  const mongodbConnection = MongoDb.connect();
  const contextMongoDb = new Context(
    new MongoDb(mongodbConnection, HeroisSchema)
  );

  const postgresConnection = await Postgres.connect();
  const model = await Postgres.defineModel(postgresConnection, usuariosSchema);
  const contextPostgres = new Context(new Postgres(postgresConnection, model));

  const swaggerOptions = {
    info: {
      title: 'Api Herois - CursoNodeBR',
      version: Pack.version,
    },
  };

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    },
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //    expiresIn: '7d',
    // },
    validate: async (data) => {
      const [result] = await contextPostgres.read({
        username: data.username.toLowerCase(),
      });

      if (!result) return { isValid: false };

      return { isValid: true };
    },
  });

  app.auth.default('jwt');

  app.route(
    // as classes de rota herdam de BaseRoutes entam todas tem o método estátuco methods()
    // methods() lista todos os metodos da classe e adiciona ao array de rotas do app
    [
      ...mapRoutes(new HeroesRoutes(contextMongoDb), HeroesRoutes.methods()),
      ...mapRoutes(
        new AuthRoutes(JWT_SECRET, contextPostgres),
        AuthRoutes.methods()
      ),
      ...mapRoutes(new UtilRoutes(), UtilRoutes.methods()),
    ]
  );

  await app.start();
  console.log('Servidor rodando na porta: ', app.info.port);

  return app;
}

module.exports = main();
