import { MongoClient } from 'mongodb'

async function dbConnect() {
  const client = new MongoClient('mongodb://joaovitor:senha123@localhost:27017')
  await client.connect()
  console.log('Mongo db is connected!')
  const db = client.db('comics')
  return {
    client,
    collections: { heroes: db.collection('heroes') }
  }
}

try {
  const { collections, client } = await dbConnect()

  await collections.heroes.insertOne({ createdAt: new Date().toUTCString(), name: 'Flash' })
  const heroes = await collections.heroes.find().toArray()

  console.log({ heroes })
  await client.close()
} catch (e) {
  console.log('error: ', e)
}
