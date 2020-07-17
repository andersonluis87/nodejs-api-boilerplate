import { uuid } from 'uuidv4';
import UserTypes from '../models/UserTypes';

class UserTypesController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const userTypes = await UserTypes.findAll({
      order: ['name'],
      attributes: ['id', 'name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(userTypes);
  }

  async store(req, res) {
    const { name } = req.body;

    const userTypes = await UserTypes.create({
      id: uuid(),
      name,
    });

    return res.status(201).json(userTypes);
  }

  async update(req, res) {
    const userType = await UserTypes.findByPk(req.params.id);

    if (!userType) {
      return res.status(400).json({ error: 'User Type does not exist' });
    }

    const userTypeUpdated = await userType.update(req.body);

    return res.status(200).json(userTypeUpdated);
  }

  async delete(req, res) {
    const userType = await UserTypes.findByPk(req.params.id);

    if (!userType) {
      return res.status(400).json({ error: 'User Type does not exists' });
    }

    await userType.destroy();

    return res.status(204).json();
  }
}

export default new UserTypesController();
