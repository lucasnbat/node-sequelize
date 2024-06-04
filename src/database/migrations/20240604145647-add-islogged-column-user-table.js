'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'employees',
      'isLogged',
      {
        type: Sequelize.BOOLEAN
      }
    )
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'employees',
      'isLogged'
    )
  }
};
