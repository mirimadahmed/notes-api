'use strict';
const { NOTE } = require('../utils/constants')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('notes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      content: {
        type: Sequelize.STRING,
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM(NOTE.TYPE.PERSONAL, NOTE.TYPE.WORK), // Specify possible enum values
        allowNull: false,
        defaultValue: NOTE.TYPE.PERSONAL
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Use the actual table name
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Add foreign key constraint
    await queryInterface.addConstraint('notes', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'notes_userId_fk',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('notes', 'notes_userId_fk');
    await queryInterface.dropTable('notes');
  }
};
