module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Example: Adding a new column 'phone' to the 'users' table
    await queryInterface.addColumn("users", "phone_number", {
      type: Sequelize.BIGINT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'phone' column when rolling back the migration
    await queryInterface.removeColumn("users", "rollno");
  },
};
