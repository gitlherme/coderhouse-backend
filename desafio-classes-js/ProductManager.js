class ProductManager {
  constructor() {
    this.products = [];
  }

  getProductById(id) {
    return this.products.find(product => product.id === id) || '🚨 Produto não encontrado 🚨';
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    const id = this.products.length + 1;

    const idExists = this.products.find(product => product.id === id);
    if (idExists) {
      return '🚨 O produto já existe. 🚨';
    }

    const codeExists = this.products.find(product => product.code === code);
    if (codeExists) {
      return '🚨 Um produto com esse código já foi registrado. Preencha com um código único. 🚨';
    }

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return '🚨 Por favor, preencha todos os campos. 🚨';
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
  
    return 'Produto registrado com sucesso! ✅';
  }
}

const productManager = new ProductManager();

// Create a new valid product
const camiseta = productManager.addProduct(
  'Camiseta',
  'Uma linda camiseta branca',
  20,
  'https://picsum.photos/200',
  123456,
  100
)

console.log('================================');
console.log('Camiseta 1: ', camiseta);
console.log('================================');

// Create a new invalid product (missing fields)
const camiseta2 = productManager.addProduct(
  'Camiseta',
  'Uma linda camiseta branca',
  20,
  'https://picsum.photos/200',
  456123
) // Missing stock

console.log('================================');
console.log('Camiseta 2: ', camiseta2);
console.log('================================');

// Create a new invalid product (same code)
const camiseta3 = productManager.addProduct(
  'Camiseta',
  'Uma linda camiseta branca',
  20,
  'https://picsum.photos/200',
  123456
)

console.log('================================');
console.log('Camiseta 3: ', camiseta3);
console.log('================================');

// Get a valid product
const getCamiseta = productManager.getProductById(1);

console.log('================================');
console.log('Dados camiseta 1: ', getCamiseta);
console.log('================================');

// Get a invalid product
const getInvalidProduct = productManager.getProductById(100);

console.log('================================');
console.log('Retorno produto invalido: ', getInvalidProduct);
console.log('================================');

