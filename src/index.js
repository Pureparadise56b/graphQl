import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { createApolloServer } from './graphql/GqlServer.js'

async function init() {
  const app = express()
  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send('App started')
  })
  app.use(express.json())
  app.use('/graphql', expressMiddleware(await createApolloServer()))

  app.listen(port, () => console.log(`Server started at port: ${port}`))
}

init()
