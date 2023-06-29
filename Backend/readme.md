# Criar Postgres

sudo docker run \
 --name postgres \
 -e POSTGRES_USER=lucas \
 -e POSTGRES_PASSWORD=essaeasenha \
 -e POSTGRES_DB=heroes \
 -p 5432:5432 \
 -d \
 postgres

docker exec -it postgres /bin/bash -> logar no container
exit -> sair do container

# Criar Adminer

sudo docker run \
 --name adminer \
 -p 8080:8080 \
 --link postgres:posrtgres \
 -d \
 adminer

# Criar MongoDB

sudo docker run \
 --name mongodb \
 -p 27017:27017 \
 -e MONGO_INITDB_ROOT_USERNAME=admin \
 -e MONGO_INITDB_ROOT_PASSWORD=senhaadmin \
 -d \
 mongo:4

# Criar mongoclient

sudo docker run \
 --name mongoclient \
 -p 3000:3000 \
 --link mongodb:mongodb \
 -d \
 mongoclient/mongoclient

# Criar usuário mongoDB

sudo docker exec -it mongodb \
 mongo --host localhost -u admin -p senhaadmin --authenticationDatabase admin \
 --eval "db.getSiblingDB('herois').createUser({user: 'lucasbatista', pwd: 'minhasenhasecreta', roles: [{role: 'readWrite', db: 'herois'}]})"

# PARA REMOVER CONTAINERS

sudo docker rm ${docker ps -aq}

# PARA ACESSAR:

192.168.1.20:NUMERO_DA_PORTA no navegador
