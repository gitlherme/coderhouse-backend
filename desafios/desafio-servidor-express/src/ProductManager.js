import fs from 'fs';

export class ProductManager {
  constructor() {
    this.path;
  }

  initializeProducts() {
    fs.writeFileSync(this.path, JSON.stringify([]), 'utf-8');
  }

  getProducts() {
    const products = fs.readFileSync(this.path, 'utf-8');
    return JSON.parse(products);
  }

  getProductById(id) {
    const products = this.getProducts();
    const product = products.find((product) => product.id === id);

    if (product) return console.log(product);
    else return console.error('Não foi possível encontrar o produto');
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    const products = this.getProducts();
    const id = products.length + 1;

    const idExists = products.find(product => product.id === id);
    if (idExists) {
      return console.error('🚨 O produto já existe. 🚨');
    }

    const codeExists = products.find(product => product.code === code);
    if (codeExists) {
      return console.error('🚨 Um produto com esse código já foi registrado. Preencha com um código único. 🚨');
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.error('🚨 Por favor, preencha todos os campos. 🚨');
    }

    products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    });

    fs.writeFile(this.path, JSON.stringify(products), 'utf-8', (error) => {
      if (error) console.error('Erro ao gravar arquivo.');
    })
  
    return console.log('Produto registrado com sucesso! ✅');
  }

  updateProduct(id, product) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);

    if (index === -1) {
      return console.error('Não foi encontrado nenhum produto com esse id.');
    }

    product.id = id;
    products[index] = {
      id: product.id,
      title: product.title || products[index].title,
      description: product.description || products[index].description,
      code: product.code || products[index].code,
      price: product.price || products[index].price,
      stock: product.stock || products[index].stock,
      thumbnail: product.thumbnail || products[index].thumbnail,
    }

    fs.writeFile(this.path, JSON.stringify(products), 'utf-8', (error) => {
      if (error) console.error('Erro ao gravar arquivo.');
    });
    return console.log('Produto alterado com sucesso! ✅');
  }

  deleteProduct(id) {
    const products = this.getProducts();
    const newProducts = products.filter(product => product.id !== id);
    fs.writeFile(this.path, JSON.stringify(newProducts), 'utf-8', (error) => {
      if (error) console.error('Erro ao gravar arquivo.');
    });
    console.log('Produto removido com sucesso! ✅');
  }
}

export const productManager = new ProductManager();
productManager.path = './src/products.txt';

productManager.initializeProducts();



setTimeout(() => {
  console.log(`Adicionando produto 1`);
  productManager.addProduct({
    title: `Produto 1`,
    description: `Descrição do produto 1`,
    price: 100,
    thumbnail: 'https://picsum.photos/200/200',
    code: 1234,
    stock: 1000,
  });
  console.log('-------------------')
}, 1000)

setTimeout(() => {
  console.log(`Adicionando produto 2`);
  productManager.addProduct({
    title: `Produto 2`,
    description: `Descrição do produto 3`,
    price: 100,
    thumbnail: 'https://picsum.photos/200/200',
    code: 12347,
    stock: 1000,
  });
  console.log('-------------------')
}, 2000)

setTimeout(() => {
  console.log(`Adicionando produto 3`);
  productManager.addProduct({
    title: `Produto 3`,
    description: `Descrição do produto 3`,
    price: 100,
    thumbnail: 'https://picsum.photos/200/200',
    code: 12345,
    stock: 1000,
  });
  console.log('-------------------')
}, 3000)

setTimeout(() => {
  console.log(`Adicionando produto 4`);
  productManager.addProduct({
    title: `Produto 4`,
    description: `Descrição do produto 4`,
    price: 100,
    thumbnail: 'https://picsum.photos/200/200',
    code: 12345123,
    stock: 1000,
  });
  console.log('-------------------')
}, 4000)

setTimeout(() => {
  console.log(`Adicionando produto 5`);
  productManager.addProduct({
    title: `Produto 5`,
    description: `Descrição do produto 5`,
    price: 100,
    thumbnail: 'https://picsum.photos/200/200',
    code: 12355,
    stock: 1000,
  });
  console.log('-------------------')
}, 5000)


