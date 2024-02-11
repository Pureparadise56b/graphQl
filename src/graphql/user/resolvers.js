import { UserService } from '../../services/user.js'

const queries = {
  loginUser: async (_, { email, password }) => {
    const token = await UserService.getUserToken(email, password)
    return token
  },
}
const mutations = {
  createUser: async (_, { name, email, password }) => {
    const res = await UserService.createUser(name, email, password)
    return res.id
  },
}

export const resolvers = { queries, mutations }
