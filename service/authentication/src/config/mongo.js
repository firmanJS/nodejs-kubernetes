const mongoose = require('mongoose')

const dbUrl = process.env.MONGO_URL || ''

mongoose.Promise = global.Promise

const connectToMongo = () => mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true
}, (err) => {
  if (err) {
    const msg = `Failed to connect to mongo on startup - retrying ${err}`
    if (process.env.NODE_ENV === 'development') {
      console.error(msg)
    } else {
      console.info(msg)
    }
  } else {
    console.info('mongoDB Connected ✅')
  }
})

mongoose.connection.on('disconnected', (err) => {
  console.info(`Lost MongoDB connection ${err}`)
})

mongoose.connection.on('reconnected', (err) => {
  console.info(`Reconnected to MongoDB ${err}`)
})

if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    console.info(`${collectionName}.${method}`, JSON.stringify(query), doc)
  });
}

module.exports = {
  connectToMongo
}