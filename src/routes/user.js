import { createUser, deleteUserById, getDataUsers, getUsers } from '../controllers/user';
import { loginUser } from '../controllers/login';
import handleErrors from '../middlewares/handleErrors';
import notFound from '../middlewares/notFound';
import decodeUser from '../middlewares/decodeUser';

module.exports = (app) => {
  app.post('/api/user/login', loginUser);

  app.post('/api/user/create', createUser);

  app.post('/api/users/read', decodeUser, getUsers);

  app.delete('/api/user/delete/:id', decodeUser, deleteUserById);

  app.get('/api/users/read/data', decodeUser, getDataUsers);

  app.use(notFound);

  app.use(handleErrors);

};