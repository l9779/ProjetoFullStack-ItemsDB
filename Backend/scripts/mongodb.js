// executar banco de dados
sudo docker exec -it 612c86d924cf \
 mongo -u lucasbatista -p minhasenhasecreta --authenticationDatabase herois

// mostrar databases
show dbs

// seleciona o contexto para uma database
use herois

// mostrar tabelas
show collections

// CREATE
db.herois.insert({
nome: 'flash',
poder: 'Velocidade',
dataNascimento: '1982-11-01'
})
// inserir dados com JS
for (let i = 0; i < 100; i++) {
  db.herois.insert({
  nome: `Item ${i}`,
  poder: 'Poder Especial',
  dataNascimento: '1999-01-01'
  })
}

// READ
db.herois.find()
db.herois.find().pretty()
db.herois.count()
db.herois.findOne()
// exibir vinte dados em ordem de nome decrescente
db.herois.find().limit(20).sort({nome: -1})
// exibir dados somente com um atributo
db.herois.find({}, {poder: 1, _id: 0})

// UPDATE
db.herois.update({_id: ObjectId("ID_DO_OBJETO")}, {nome: 'Mulher Maravilha'})
// no mongodb se todos os campos não forem especificados eles serão deletados
db.herois.update({_id: ObjectId("ID_DO_OBJETO")}, {nome: 'Mulher Maravilha', poder: 'alguma coisa'})

// atualizar somente atributo especifico
db.herois.update({_id: ObjectId("ID_DO_OBJETO")}, {$set: {nome: 'Mulher Maravilha'}})

// DELETE
// deleta todos os dados da tabela
db.herois.remove({}) 
db.herois.remove({nome: 'Flash'}) 
