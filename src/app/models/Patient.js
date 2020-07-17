import Sequelize, { Model } from 'sequelize';

class Patient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        gender: Sequelize.STRING,
        address: Sequelize.STRING,
        phone_number: Sequelize.STRING,
        active: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'created_by',
      as: 'createdBy',
    });
  }
}

export default Patient;
