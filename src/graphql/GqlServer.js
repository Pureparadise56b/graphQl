import { ApolloServer } from '@apollo/server'
import { User } from './user/index.js'

async function createApolloServer() {
  // * Create Graphql server
  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query{
            ${User.queries}
        }
        type Mutation{
            ${User.mutaions}
        }
    `, // schema as a string
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    }, // actual functions that executes
  })

  await gqlServer.start()

  return gqlServer
}

export { createApolloServer }
