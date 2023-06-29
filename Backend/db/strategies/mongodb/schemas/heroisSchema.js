const Mongoose = require('mongoose');

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

module.exports = Mongoose.model('herois', heroiSchema);
