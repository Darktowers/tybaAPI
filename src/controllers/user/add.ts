import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';

import handleErrorMiddleware from '../../middleware/handle-error.middleware';
import User from '../../models/User';
import logger from '../../logger';

const buildUserQuery = (email: string) => {
  const query: any = {};
  if (email) {
    query.email = new RegExp(`.*${email}.*`, 'i');
  }
  return query;
};
const add: RequestHandler = async (req, res) => {
  const {
    name, email = undefined, password, lastName
  } = req.body;

  const query = buildUserQuery((email as string));
  const userQuery = await User.findOne(query);
  if (userQuery) {
    res.send({
      message: 'user already exists'
    });
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name, email, password: hashPassword, lastName, token: ''
    });
    await user.save();

    res.send({
      message: 'Saved',
      user: user.toJSON()
    });
  }
};

export default handleErrorMiddleware(add);
