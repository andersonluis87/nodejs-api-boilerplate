import { uuid } from 'uuidv4';
import Patient from '../models/Patient';
import User from '../models/User';

class PatientsController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const pantients = await Patient.findAll({
      order: ['name'],
      attributes: [
        'id',
        'name',
        'email',
        'gender',
        'address',
        'phone_number',
        'active',
        'created_at',
        'created_at',
      ],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'createdBy',
          attributes: ['id', 'name', 'email', 'phone_number'],
        },
      ],
    });

    return res.status(200).json(pantients);
  }

  async store(req, res) {
    const { name, email, gender, address, phone_number } = req.body;
    const { userId } = req;

    const patient = await Patient.create({
      id: uuid(),
      name,
      email,
      gender,
      address,
      phone_number,
      created_by: userId,
    });

    return res.status(201).json(patient);
  }

  async update(req, res) {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(400).json({ error: 'Patient does not exists' });
    }

    const patientUpdated = await patient.update(req.body);

    return res.status(200).json(patientUpdated);
  }

  async delete(req, res) {
    const patient = await Patient.findByPk(req.params.id);

    if (!patient) {
      return res.status(400).json({ error: 'Patient does not exists' });
    }

    await patient.destroy();

    return res.status(204).json();
  }
}

export default new PatientsController();
