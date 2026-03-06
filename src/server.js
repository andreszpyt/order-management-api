const express = require('express');
const mongoose = require('mongoose');
const orderRoutes = require('./routes/orderRoutes');
require('dotenv').config();
const dbURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jitterbit_api';
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/', orderRoutes);

mongoose.connect(dbURI)
    .then(() => {
        console.log('Conectado ao banco de dados com sucesso!');

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000: http://localhost:3000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar no banco de dados:', error);
    });