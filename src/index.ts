import dotenv from 'dotenv';
import express, { json } from 'express';
import 'express-async-errors';

import { errorHandlerMiddleware } from './middlewares/errorMiddleware';
import router from './routes/index';

dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.use(errorHandlerMiddleware);

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Servidor funfando de boas na porta: ${PORT}`);
});
