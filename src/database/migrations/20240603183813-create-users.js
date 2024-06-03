'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('employees', {
      idEmployee: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employee: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      setor: {
        type: Sequelize.STRING, //acho que vai precisar mudar
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('employees');
  }
};
