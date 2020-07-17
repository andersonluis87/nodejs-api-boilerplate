const bcrypt = require('bcryptjs');
const { uuid } = require('uuidv4');

module.exports = {
  up: async (queryInterface) => {
    const userType = await queryInterface.sequelize.query(
      `select id from user_types where name = 'Administrador'`
    );

    const adminUserType = userType[0][0].id;

    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: uuid(),
          name: 'Administrador',
          email: 'admin@mpa2homecare.com',
          password_hash: bcrypt.hashSync('123456', 8),
          gender: 'male',
          user_type_id: adminUserType,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
