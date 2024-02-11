import { prismaClient } from '../lib/db.js'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'

const jwtSecret =
  '19103f6b4324faba26455d476cdb75b0edae1f864df0d013b77e0a587b9e4461'

class UserService {
  static async createUser(name, email, password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return prismaClient.user.create({
      data: {
        name,
        email,
        password: hash,
        salt,
      },
    })
  }

  static async getUserToken(email, password) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })
    if (!user) throw new Error('User does not exist.')

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) throw new Error('Password Incorrect')

    const token = JWT.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      jwtSecret
    )
    return token
  }
}

export { UserService }
