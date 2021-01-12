import { model, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose'

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

export default model('User', UserSchema);;