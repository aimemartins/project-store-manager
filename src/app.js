const express = require('express');

const app = express();
const { productsRouter, salesRouter } = require('./routers/index');

app.use(express.json()); 

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});
// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação .

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

module.exports = app;