import express from 'express';
import { productManager } from './ProductManager.js';


const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
  const { limit } = req.query;
  const allProducts = await productManager.getProducts();

  if (!allProducts) {
    res.send({ error: 'Products not found' });
  }

  const productsToReturn = allProducts.slice(0, limit);
  res.json(productsToReturn);
})

app.get('/products/:pid', async (req, res) => {
  const allProducts = await productManager.getProducts();
  
  if (!allProducts) {
    res.send({ error: 'Products not found' });
  }
  
  const id = Number(req.params.pid);
  const product = allProducts.find((product) => product.id === id);
  if (!product) {
    res.send({ error: 'Product not found' });
  }

  res.json(product);
})

app.listen(3000, () => console.log('Server is listening on port 3000'));