const queries = {
  hello: () => 'hello',
}
const mutations = {
  createUser: async (_, {}) => {
    return 'randomId'
  },
}

export const resolvers = { queries, mutations }
