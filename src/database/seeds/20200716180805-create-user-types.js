const { uuid } = require('uuidv4');

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert(
      'user_types',
      [
        {
          id: uuid(),
          name: 'Administrador',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          name: 'Responsável',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: uuid(),
          name: 'Profissional',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('user_types', null, {});
  },
};
