import { createServer } from 'http'
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

const { collections, client } = await dbConnect()

async function handler(req, res) {
  for await (const data of req) {
    try {
      const hero = JSON.parse(data)
      await collections.heroes.insertOne({ createdAt: new Date().toISOString(), ...hero })
      const heroes = await collections.heroes.find().toArray()

      console.log({ heroes })

      res.writeHead(200)
      res.write(JSON.stringify({ heroes }))
    } catch (e) {
      console.log('error: ', e)
      res.writeHead(500)
      res.write(JSON.stringify({ message: 'internal server error' }))
    } finally {
      res.end()
    }
  }
}

// await client.close()
//
// curl -i localhost:3000 -X POST --data '{"name": "Superman", "age": "200"}'

const server = createServer(handler).listen(3000, () => console.log('running at 3000 and process:', process.pid))

const onStop = (signal) => {
  console.info(`\n${signal} signal received!`);

  // zero is everythin fine, and 1 is ERROR!
  process.exit(0)
}
// [SIGINT] - Only kill the process using the pid with kill: kill <PID>
// [SIGTERM] - It do an action when we kill the PID

['SIGINT', 'SIGTERM'].forEach((event) => process.on(event, onStop))
