import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import dictionaryRoutes from './routes/dictionary.routes';

const app = express();

app.use(express.json());

app.use('/api/dictionary', dictionaryRoutes);

app.use(errorHandler);

export default app;