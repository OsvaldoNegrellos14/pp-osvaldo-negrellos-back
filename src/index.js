import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connect } from './settings/config';
import routes from './routes/user';

dotenv.config();
const app = express();
connect();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT;

routes(app);

app.listen(PORT, () => {
  console.log('Server in port: ' + PORT);
});
