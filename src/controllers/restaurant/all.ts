import { RequestHandler } from 'express';
import request from 'request';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import logger from '../../logger';
import handleErrorMiddleware from '../../middleware/handle-error.middleware';
import Log from '../../models/Log';
import verifyToken from '../../helpers/verify-token';

dotenv.config();

const API = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=#location&radius=#radius&type=restaurant&key=#apiKey';
const all: RequestHandler = async (req, res) => {
  const token = req.header('authorization').replace('Bearer', '').replace(' ', '');
  const userDecoded : any = jwt.verify(token, process.env.PASSPHRASE);
  const verify = await verifyToken(token, userDecoded);
  if (!verify) {
    res.send({
      message: 'Invalid token',
      status: false
    });
  } else {
    const { location, radius } = req.body;
    const locationString = `${location.lat},${location.lng}`;
    const FINAL_API = API.replace('#location', locationString).replace('#radius', radius).replace('#apiKey', process.env.API_KEY);
    const log = new Log({
      userId: userDecoded.id, request: { location, radius }
    });
    await log.save();
    request(FINAL_API, { json: true }, (err, resp, body) => {
      if (err) res.send({ message: `Error: ${err.message}` });
      res.json(body);
    });
  }
};

export default handleErrorMiddleware(all);
