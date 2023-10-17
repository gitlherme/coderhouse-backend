const fs = require('fs');

class ProductManager {
  constructor() {
    this.products = [];
    this.path;
  }

  getProducts() {
    const products = fs.readFileSync(this.path, 'utf8', (error, result) => {
      if (error) {
        return console.error('Não foi possível ler os produtos');
      }

      return result;
    })

    return products;
  }

  getProductById(id) {
    return this.products.find(product => product.id === id) || console.log('🚨 Produto não encontrado 🚨');
  }

  addProduct({ title, description, price, thumbnail, code, stock }) {
    const id = this.products.length + 1;

    const idExists = this.products.find(product => product.id === id);
    if (idExists) {
      return console.error('🚨 O produto já existe. 🚨');
    }

    const codeExists = this.products.find(product => product.code === code);
    if (codeExists) {
      return console.error('🚨 Um produto com esse código já foi registrado. Preencha com um código único. 🚨');
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return console.error('🚨 Por favor, preencha todos os campos. 🚨');
    }

    this.products.push({
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock
    });

    fs.writeFile(this.path, JSON.stringify(this.products), (error) => {
      if (error) console.error('Erro ao gravar arquivo.');
    })
  
    return console.log('Produto registrado com sucesso! ✅');
  }

  updateProduct(id, product) {

  }

  deleteProduct(id) {}
}

const productManager = new ProductManager();
productManager.path = './products.txt';