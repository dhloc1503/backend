'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: Sequelize.STRING,
      hash: Sequelize.STRING,
      salt: Sequelize.STRING,
      role_id: {
        references: {
          model: {
            tableName: 'roles',
            schema: 'schema',
          },
          key: 'id'
        },
        allowNull: false
      },
      created_at: Sequelize.TIME,
      updated_at: Sequelize.TIME
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    await queryInterface.dropTable('users')
  }
};
