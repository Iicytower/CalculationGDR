import { model, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new Schema({
  nickname: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'nickname' });

export default model('User', UserSchema);;