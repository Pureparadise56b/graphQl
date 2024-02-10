import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { prismaClient } from './lib/db.js'

async function init() {
  const app = express()
  const port = process.env.PORT || 3000

  const typeDefs = `
  
    type Query{
        hello: String
        myName(name: String): String
    }

    type Mutation{
      createUser(name: String!, email: String!, password: String! ): Boolean
    }
  
  `
  const resolvers = {
    Query: {
      hello: () => 'Hello I am a graphql server',
      myName: (_, { name }) => `Hello My Name is ${name}`,
    },
    Mutation: {
      createUser: async (_, { name, email, password }) => {
        await prismaClient.user.create({
          data: {
            email,
            name,
            password,
            salt: 'asdfwperuicvsdmncdsuerw',
          },
        })
        return true
      },
    },
  }

  // * Create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs, // schema as a string
    resolvers, // actual functions that executes
  })

  await gqlServer.start()

  app.get('/', (req, res) => {
    res.send('App started')
  })
  app.use(express.json())
  app.use('/graphql', expressMiddleware(gqlServer))

  app.listen(port, () => console.log(`Server started at port: ${port}`))
}

init()
