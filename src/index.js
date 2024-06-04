const express = require('express');

// importar variavel de rotas
const routes = require('./routes')

const app = express();

// chamando conexão com banco
require('./database');

// utilizarei json para comunicação com server
app.use(express.json());

// indicando que usarei as rotas do routes.js
app.use(routes);

app.listen(3333);