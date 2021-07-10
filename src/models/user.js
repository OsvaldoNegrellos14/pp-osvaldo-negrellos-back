import mongodb, { Schema } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 60 },
  email: { type: String, required: true, match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g },
  phone: { type: String, minlength: 10, maxlength: 10, required: true },
  password: { type: String, required: true },
  age: { type: Number, min: 1, max: 100, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  hobby: { type: String, minlength: 1, maxlength: 500, required: true },
  registrationDate: { type: Date, default: Date.now() }
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  }
});

module.exports = mongodb.model('User', userSchema);