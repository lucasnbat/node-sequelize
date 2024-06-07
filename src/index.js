const express = require('express');
const { resolve } = require('path');
// importar variavel de rotas
const routes = require('./routes')

const app = express();

// chamando conexão com banco
require('./database');

// utilizarei json para comunicação com server
app.use(express.json());

// indicando que usarei as rotas do routes.js
app.use(routes);

// Servindo arquivos estáticos para PDFs
app.use('/pdfs/', express.static(resolve(__dirname, 'uploads', 'pdfs')));

app.listen(3333);