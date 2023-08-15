const User = require('../models/user')

class UserRepository {
  // Create a new user
  async create (user) {
    return User.create(user)
  }

  // Get a user by ID
  async getById (userId) {
    return User.findByPk(userId)
  }

  // Get a user by email
  async getByEmail (email) {
    return User.findOne({ where: { email } })
  }
}

module.exports = UserRepository
