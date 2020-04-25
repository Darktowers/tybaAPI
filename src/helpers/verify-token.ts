import { RequestHandler } from 'express';
import request from 'request';
import User from '../models/User';
import logger from '../logger';

const buildUserQuery = (email: string) => {
  const query: any = {};
  if (email) {
    query.email = new RegExp(`.*${email}.*`, 'i');
  }
  return query;
};
const verifyToken = async (token: string, decoded: any) => {
  const query = buildUserQuery((decoded.email as string));
  const userQuery = await User.findOne(query);

  logger.log({ level: 'debug', message: 'debug', token: token === userQuery.token });
  if (token === userQuery.token) {
    return true;
  }
  return false;
};

export default verifyToken;
