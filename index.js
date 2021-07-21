const express = require('express');
require('dotenv').config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (_req, resp) => {
  resp.status(200).json({ message: 'Ola mundo' });
});

const { PORT } = process.env || 3000;

app.listen(PORT, () => console.log(`Servidor iniciou na porta ${PORT}`));
