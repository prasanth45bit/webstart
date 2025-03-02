"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("DogHistories", [
      {
        breed: "Golden Retriever",
        age: 3,
        user_id: 1,
        color: "Golden",
        weight: "30kg",
        image_path: "uploads/dog1.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        breed: "Labrador",
        age: 4,
        user_id: 2,
        color: "Black",
        weight: "35kg",
        image_path: "uploads/dog2.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        breed: "German Shepherd",
        age: 5,
        user_id: 3,
        color: "Brown",
        weight: "40kg",
        image_path: "uploads/dog3.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("DogHistories", null, {});
  },
};
