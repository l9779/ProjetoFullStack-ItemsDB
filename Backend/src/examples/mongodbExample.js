const Mongoose = require('mongoose');

try {
  Mongoose.connect(
    'mongodb://lucasbatista:minhasenhasecreta@192.168.1.20:27017/herois',
    {
      useNewUrlParser: true,
    }
  );
} catch (error) {
  console.log('Falha na conexão!', error);
}

const connection = Mongoose.connection;
connection.once('open', () => {
  console.log('Database Connectada com Sucesso!');
});

// setTimeout(() => {
//   const state = connection.readyState;
//   /**
//    * 0 - Desconectado
//    * 1 - Conectado
//    * 2 - Conectando
//    * 3 - Desconectando
//    */
//   console.log('state', state);
// }, 1000);

const heroiSchema = new Mongoose.Schema({
  nome: {
    type: String,
    required: true,
  },
  poder: {
    type: String,
    require: true,
  },
  insertedAt: {
    type: Date,
    default: new Date(),
  },
});

const model = Mongoose.model('herois', heroiSchema);

async function main() {
  const resultCadastrar = await model.create({
    nome: 'Miranha',
    poder: 'teia',
  });

  console.log('Result', resultCadastrar);

  const listItems = await model.find();
  console.log('itens', listItems);
}

main();
