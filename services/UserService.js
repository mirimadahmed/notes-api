const UserRepository = require('../repositories/UserRepository') // Replace the path with the correct location of your UserRepository.js file
const bcrypt = require('bcryptjs')
const userRepository = new UserRepository()

class UserService {
  async createUser(userData) {
    const { password, email } = userData

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)

      // Create the user in the repository
      return await userRepository.create({
        password: hashedPassword,
        email
      })
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to create user')
    }
  }

  async getUserById(userId) {
    return userRepository.getById(userId)
  }

  async getUserByEmail(email) {
    // Call the UserRepository to get a user by email
    return userRepository.getByEmail(email)
  }

  async verifyUserPassword(user, password) {
    try {
      // Compare the password
      const isPasswordValid = await bcrypt.compare(password, user.password)

      if (isPasswordValid) {
        // Password is valid, return the user
        return user
      } else {
        throw new Error('Invalid password')
      }
    } catch (error) {
      // Handle any errors
      throw new Error('Failed to login')
    }
  }
}

module.exports = UserService
