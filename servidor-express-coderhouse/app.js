import express from 'express';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let phrase = 'Servidor com express Coderhouse';

app.get('/api/frase', (req, res) => {
  return res.json({ frase: phrase });
})

app.get('/api/palavras/:pos', (req, res) => {
  const splittedWords = phrase.split(' ');

  // Caso queira a palavra #1, ele pegará a do index 0, e assim por diante.
  const word = splittedWords[req.params.pos - 1];

  return res.json({ busca: word })
})

app.post('/api/palavras', (req, res) => {
  const word = req.body.palavra;
  phrase = `${phrase} ${word}`;
  const splittedWords = phrase.split(' ');
  const position = splittedWords.length;

  return res.json({ adicionado: word, pos: position })
})

app.put('/api/palavras/:pos', (req, res) => {
  const word = req.body.palavra;
  const splittedWords = phrase.split(' ');
  const oldWord = splittedWords[req.params.pos - 1];
  splittedWords[req.params.pos - 1] = word;
  phrase = splittedWords.join(' ');

  return res.json({ atualizado: word, anterior: oldWord });
})

app.delete('/api/palavras/:pos', (req, res) => {
  const splittedWords = phrase.split(' ');
  const word = splittedWords[req.params.pos - 1];
  splittedWords.splice(req.params.pos - 1, 1);
  phrase = splittedWords.join(' ');

  return res.json({ deletado: word });
})

const port = 3000;
app.listen(port, () => console.log(`Servidor iniciado na porta ${port}`))