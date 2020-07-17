import User from '../models/User';
import UserTypes from '../models/UserTypes';

class UsersController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const users = await User.findAll({
      order: ['name'],
      attributes: ['name', 'email', 'gender', 'phone_number', 'active'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: UserTypes,
          as: 'userType',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(users);
  }

  async store(req, res) {
    const user = await User.create(req.body);

    return res.status(201).json(user);
  }

  async update(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const { id, name, email, gender, phone_number, active } = await user.update(
      req.body
    );

    return res.json({ id, name, email, gender, phone_number, active });
  }

  async delete(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    await user.destroy();

    return res.status(204).json();
  }
}

export default new UsersController();
