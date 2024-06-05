'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('employees', 'id_department', {
      type: Sequelize.INTEGER,
      references: {
        model: 'departments',
        key: 'idDepartment',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('employees', 'id_department');
  }
};
