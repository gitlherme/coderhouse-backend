import express from 'express';	

const petsRouter = express.Router();

const pets = []

petsRouter.use(express.json());
petsRouter.use(express.urlencoded({ extended: true }));

petsRouter.post('/', (req, res) => {
  const { pet } = req.body;
  pets.push(pet);
  return res.json({ pets });
})

export default petsRouter;