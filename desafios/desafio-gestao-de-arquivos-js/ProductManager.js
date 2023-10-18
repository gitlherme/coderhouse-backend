const fs = require('fs');

class ProductManager {
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

const productManager = new ProductManager();

// Define o path para a criação do arquivo
productManager.path = './products.txt';

// Cria o arquivo no path especificado
productManager.initializeProducts();

// Adicionando um novo produto
console.log('-------------------')
console.log('Adicionando produto 1')
productManager.addProduct({
  title: 'Produto 1',
  description: 'Descrição do produto 1',
  code: 12345,
  price: 100,
  stock: 1000,
  thumbnail: 'https://picsum.photos/200/200'
});
console.log('-------------------')

console.log('-------------------')
console.log('Adicionando produto 2')
productManager.addProduct({
  title: 'Produto 2',
  description: 'Descrição do produto 2',
  code: 12346,
  price: 100,
  stock: 1000,
  thumbnail: 'https://picsum.photos/200/200'
});
console.log('-------------------')


console.log('-------------------')
console.log('Pegando produto com id 1')
productManager.getProductById(1);
console.log('-------------------')

console.log('-------------------')
console.log('Ajustando o produto com id 2')
productManager.updateProduct(2, {
  title: 'Produto com Title Alterado',
})
console.log('-------------------')

console.log('-------------------')
console.log('Mostrando o produto com os valores alterados')
productManager.getProductById(2);
console.log('-------------------')


console.log('-------------------')
console.log('Deletando o produto com id 1, agora deve ficar só o produto com id 2')
productManager.deleteProduct(1);
console.log('-------------------')