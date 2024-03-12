// Run on terminal to initialize the mongodb
docker run \
	--name mongodb \
	-e MONGO_INITDB_ROOT_USERNAME=joaovitor \
	-e MONGO_INITDB_ROOT_PASSWORD="senha123" \
	-e POSTGRES_DB=heroes \
	-p 27017:27017 \
	-d \
	mongo:4
