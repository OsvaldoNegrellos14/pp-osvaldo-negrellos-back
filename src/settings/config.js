import mongoose from 'mongoose';

export const connect = () => {
  const connectString = process.env.MONGO_DB_URI;
  mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => {
    console.log('Database connected');
  }).catch(error => {
    console.log('Error BD: ' + error.name);
  });
};