import express from 'express';
import petsRouter from './routes/pets.route.js';

const app = express();

app.use(express.static('./public'));

app.use('/pets', petsRouter)

app.listen(3000, () => console.log('listening on port 3000'))