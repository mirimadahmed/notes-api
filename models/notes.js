const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const User = require('./user')

const Notes = sequelize.define('Notes', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM,
    allowNull: false,
    defaultValue: "Personal"
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
  tableName: 'notes' // Specify the table name
})

// Define the association with User
Notes.belongsTo(User, { foreignKey: 'userId' })

module.exports = Notes
