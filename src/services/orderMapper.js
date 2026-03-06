function mapOrderToDatabaseFormat(requestBody) {
    return {
        orderId: requestBody.numeroPedido,
        value: requestBody["valor Total"],
        creationDate: requestBody["data Criacao"],

        items: requestBody.items.map(item => {
            return {
                productId: parseInt(item.idItem),
                quantity: item.quantidadeltem,
                price: item.valorltem
            };
        })
    };
}

module.exports = { mapOrderToDatabaseFormat };