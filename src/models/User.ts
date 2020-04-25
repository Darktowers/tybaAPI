import {
  Document, Model, Schema, model
} from 'mongoose';

export interface IUser extends Document {
    /** Name of the user */
    name: string;
    /** last name of the user */
    lastName: string;
    /** email of the user */
    email: string;
    /** password of the user */
    password: string;
    token: string;

}

interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false }

});
schema.set('toJSON', {
  transform(_doc, ret, _options) {
    const rets = ret;
    delete rets.password; // Hide password from toJson method
    delete rets.token; // Hide password from toJson method
    return rets;
  }
});
const user: IUserModel = model<IUser, IUserModel>('user', schema);

export default user;
