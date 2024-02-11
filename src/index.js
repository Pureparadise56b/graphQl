import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import { createApolloServer } from './graphql/GqlServer.js'
import { UserService } from './services/user.js'

async function init() {
  const app = express()
  const port = process.env.PORT || 3000

  app.get('/', (req, res) => {
    res.send('App started')
  })
  app.use(express.json())
  app.use(
    '/graphql',
    expressMiddleware(await createApolloServer(), {
      context: async ({ req, res }) => {
        const token = req.headers['token']

        const user = await UserService.verifyUser(token)
        if (!user) {
          return {}
        }
        return { user }
      },
    })
  )

  app.listen(port, () => console.log(`Server started at port: ${port}`))
}

init()
