import { RequestHandler } from 'express';
import handleErrorMiddleware from '../../middleware/handle-error.middleware';
import Log from '../../models/Log';

const all: RequestHandler = async (req, res) => {
  const logs = await Log.find();
  res.send({ logs });
};

export default handleErrorMiddleware(all);
