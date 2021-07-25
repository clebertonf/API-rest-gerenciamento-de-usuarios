const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(require('./routers/index'));

const { PORT_APP } = process.env || 3000;

app.listen(PORT_APP, () => console.log(`Servidor iniciou na porta ${PORT_APP}`));
