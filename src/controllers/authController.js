const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

async function login(req, res) {
    const mockUser = { id: 1, username: 'admin' };

    const token = jwt.sign(mockUser, SECRET_KEY, { expiresIn: '1h' });

    return res.status(200).json({
        message: "Autenticado com sucesso",
        token: token
    });
}

module.exports = { login, SECRET_KEY };