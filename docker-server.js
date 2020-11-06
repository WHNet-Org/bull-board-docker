const { setQueues, router } = require('bull-board')
const { Queue } = require('bullmq')
const app = require('express')()
const basicAuth = require('express-basic-auth')

const redisOptions = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || 'localhost',
  password: process.env.REDIS_PASSWORD || '',
  tls: process.env.REDIS_TLS || false,
}

const createQueueMQ = name => new Queue(name, { connection: redisOptions })

const run = () => {
  const queues = (process.env.REDIS_QUEUES || '').split(',')
  const queueMqList = queues.map(queueName => {
    return createQueueMQ(queueName)
  })

  setQueues(queueMqList)
  let users = {
    [process.env.USERNAME_1 || 'admin']: process.env.PASSWORD_1 || 'admin',
    [process.env.USERNAME_2 || '']: process.env.PASSWORD_2 || '',
    [process.env.USERNAME_3 || '']: process.env.PASSWORD_3 || '',
    [process.env.USERNAME_4 || '']: process.env.PASSWORD_4 || '',
    [process.env.USERNAME_5 || '']: process.env.PASSWORD_5 || '',
  };
  if ('' in users) {
    delete users[''];
  }

  app.use(basicAuth({
    users,
    challenge: true,
  }))
  app.use('/', router)
  app.listen(4000, () => {
    console.log('Ready! Listening on port 4000')
  })
}

run()
