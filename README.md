# Node JS Api Boilerplate

## Dependencies
First of all, you will have to install some dependencies on your development environment.

### Yarn
- Instalation Guide: https://classic.yarnpkg.com/en/docs/install

### VS Code extensions:
- **ESLint**: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
- **Editor Config**: https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig
- **Prettier**: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode


---

## ES Lint Auto-save on VS Code
You can set your visual studio code to autofix some issues found by ESLint. To that, open the Visual Studio Code Settings JSON and add the following attributes:
```json
"[javascript]": {
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
},
"[typescript]": {
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```

---

## Running the API
To start the server, all you need to do is running the following command:
```bash
yarn dev
```
To run the server on debug mode, you can run like this:
```bash
yarn dev:debug
```
> This debug mode runs in attach mode, which means that you will have to start the debug from visual studio code menu. When it starts, you just need to set a breakpoint on your code and won't need to restart the debug when the code changes.

---

## Sequelize ORM
All documentation related to Sequelize can be found here: https://sequelize.org/master/

### Migrations
Below you can find some basic migration commands.

**Creating a new migration:**
```bash
yarn sequelize migration:create --name=create-users
```

Even though sequelize generates a migration file with some examples, below you can see a *real world example* of a migration script:
```javascript
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      user_type_id: {
        type: Sequelize.UUID,
        references: {
          model: 'user_types',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('users');
  },
};
```

**Running the migration:**
```bash
yarn sequelize db:migrate
```
> **Remember**: Migrations are created in order, so they will be executed in order as well. So, if you have associations between tables, you should create the domain tables first.

**Reverting the last executed migration:**
```bash
yarn sequelize db:migrate:undo
```

**Reverting all execute migrations:**
```bash
yarn sequelize db:migrate:undo:all
```

### Seeds
Below you can find some basic seed commands.

**Generating seeds:**
```bash
yarn sequelize seed:generate --name create-new-user
```
Below you can see a real world example of a seed script. Notice that this one is more complex as it has associated tables involved. You can run queries to retrieve data before feeding the foreing key columns that you need with correct data.
```javascript
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
```

**Running the seeds:**
```bash
yarn sequelize db:seed:all
```

**Reverting the last executed seed:**
```bash
yarn sequelize db:seed:undo
```

**Reverting all executed seeds:**
```bash
yarn sequelize db:seed:undo:all
```
