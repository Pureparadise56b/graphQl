import { UserService } from '../../services/user.js'

const queries = {
  loginUser: async (_, { email, password }) => {
    const token = await UserService.getUserToken(email, password)
    return token
  },

  getCurrentUser: async (_, {}, context) => {
    if (Object.keys(context.user).length !== 0) {
      return context.user
    }

    // throw new Error('User not found')
    throw new Error("I don't know who are you")
  },
}
const mutations = {
  createUser: async (_, { name, email, password }) => {
    const res = await UserService.createUser(name, email, password)
    return res.id
  },
}

export const resolvers = { queries, mutations }
