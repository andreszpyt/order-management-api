function globalErrorHandler(err, req, res, next) {
    console.error(`[ERRO CAPTURADO]: ${err.message}`);

    if (err.name === 'ValidationError') {
        return res.status(400).json({
            message: "Erro de validação nos dados enviados.",
            details: err.message
        });
    }

    if (err.code === 11000) {
        return res.status(409).json({
            message: "Conflito: Já existe um registro com este identificador único.",
            details: err.keyValue
        });
    }

    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        return res.status(401).json({
            message: "Token de autenticação inválido ou expirado."
        });
    }

    const statusCode = err.statusCode || 500;
    return res.status(statusCode).json({
        message: err.customMessage || "Erro interno do servidor.",
        error: err.message
    });
}

module.exports = globalErrorHandler;