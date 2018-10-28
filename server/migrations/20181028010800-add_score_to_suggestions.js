'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addColumn('Suggestions','score', Sequelize.FLOAT);
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.removeColumn('Suggestions','score');
  }
};
