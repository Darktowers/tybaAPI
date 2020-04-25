import {
  Document, Model, Schema, model
} from 'mongoose';

export interface RestaurantRequest {
  location: {
    lat: number;
    lng: number;
  },
  radius: number;
}

export interface ILog extends Document {
  /** request by the user */
  request: RestaurantRequest;
  /** user email */
  userId: string;
}

interface ILogModel extends Model<ILog> { }

const schema = new Schema({
  request: {
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    radius: { type: Number, required: true }
  },
  userId: { type: String, required: true }
});

const Log: ILogModel = model<ILog, ILogModel>('Log', schema);

export default Log;
