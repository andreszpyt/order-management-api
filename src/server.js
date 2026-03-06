const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./src/routes/orderRoutes');
require('dotenv').config();
const uri = process.env.MONGO_URI;
const app = express();

app.use(express.json());

app.use('/', orderRoutes);

mongoose.connect(uri)
    .then(() => {
        console.log('Conectado ao banco de dados com sucesso!');

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000: http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar no banco de dados:', error);
    });