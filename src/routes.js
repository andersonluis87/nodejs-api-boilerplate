import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/SessionsController';
import UsersController from './app/controllers/UsersController';
import UserTypesController from './app/controllers/UserTypesController';
import PatientsController from './app/controllers/PatientsController';

const routes = new Router();

/**
 * Authentication
 */
routes.post('/sessions', SessionController.store);

/**
 * Token required for next routes from here
 */
routes.use(authMiddleware);

/**
 * UserTypes
 */
routes.get('/userTypes', UserTypesController.index);
routes.post('/userTypes', UserTypesController.store);
routes.put('/userTypes/:id', UserTypesController.update);
routes.delete('/userTypes/:id', UserTypesController.delete);

/**
 * Users
 */
routes.get('/users', UsersController.index);
routes.post('/users', UsersController.store);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

/**
 * Patients
 */
routes.get('/patients', PatientsController.index);
routes.post('/patients', PatientsController.store);
routes.put('/patients/:id', PatientsController.update);
routes.delete('/patients/:id', PatientsController.delete);

export default routes;
