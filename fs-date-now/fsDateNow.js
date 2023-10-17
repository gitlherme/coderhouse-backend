const fs = require('fs');


const message = `
  Data: ${new Date(Date.now()).toLocaleDateString()}
  Hora: ${new Date(Date.now()).toLocaleTimeString()}
`

fs.writeFile('./dateNow.txt', message, (error) => {
  if (error) console.error('Erro ao gravar arquivo.');
  fs.readFile('./dateNow.txt', 'utf-8', (error, result) => {
    if (error) console.error('Erro ao ler arquivo.');
    console.log(result);
  })
})