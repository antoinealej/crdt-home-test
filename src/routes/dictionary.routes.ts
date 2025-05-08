import express from 'express';
import { lookup, add, remove, update, merge, getAll } from '../controllers/dictionary.controller';

const dictionaryRoutes = express.Router();

dictionaryRoutes.get('/lookup/:key', lookup);
dictionaryRoutes.get('/lookup', getAll);
dictionaryRoutes.post('/add', add);
dictionaryRoutes.delete('/remove/:key', remove);
dictionaryRoutes.put('/update', update);
dictionaryRoutes.post('/merge', merge);

export default dictionaryRoutes;