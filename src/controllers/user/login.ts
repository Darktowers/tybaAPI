import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import handleErrorMiddleware from '../../middleware/handle-error.middleware';
import User from '../../models/User';
import logger from '../../logger';
/**
 * Builds a mongoose query object to search books according to book name and author name.
 * @param email String containing the book name or part of the book's name
 * @param password String containing the author name or part of the author's name
 */
const buildUserQuery = (email: string) => {
  const query: any = {};
  if (email) {
    query.email = new RegExp(`.*${email}.*`, 'i');
  }
  return query;
};

const login: RequestHandler = async (req, res) => {
  const { email = undefined, password = undefined } = req.body;
  const query = buildUserQuery((email as string));
  const user = await User.findOne(query);

  if (bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, email: user.email },
      process.env.PASSPHRASE,
      { expiresIn: 129600 }); // Sigining the token
    await User.findOne(query, (_err, doc) => {
      // eslint-disable-next-line no-param-reassign
      doc.token = token;
      doc.save();
    });
    res.send({
      sucess: true,
      token
    });
  } else {
    res.send({
      message: 'Username or password is incorrect',
      success: false
    });
  }
};

export default handleErrorMiddleware(login);
