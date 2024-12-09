'use strict';

const { enumData } = require('../utils/contansts');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GroupNotifications', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      groupId: {
        type: Sequelize.STRING
      },
      recipientId: {
        type: Sequelize.STRING
      },
      senderId: {
        type: Sequelize.STRING
      },
      notificationTypeGroup: {
        type: Sequelize.ENUM,
        values: enumData.notificationTypeGroup
      },
      referenceId: {
        type: Sequelize.STRING
      },
      seen: {
        type: Sequelize.BOOLEAN,
        default: false
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GroupNotifications');
  }
};