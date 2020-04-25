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

const logout: RequestHandler = async (req, res) => {
  if (!req.header('authorization')) {
    res.send({
      message: 'you need to be logged in',
      success: false
    });
  }
  const token = req.header('authorization').replace('Bearer', '').replace(' ', '');
  const userDecoded: any = jwt.verify(token, process.env.PASSPHRASE);
  const query = buildUserQuery((userDecoded.email as string));
  await User.findOne(query, (_err, doc) => {
    // eslint-disable-next-line no-param-reassign
    doc.token = '';
    doc.save();
  });
  res.send({
    message: 'Username logout succesfully',
    success: true
  });
};

export default handleErrorMiddleware(logout);
