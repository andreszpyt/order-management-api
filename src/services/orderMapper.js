function mapOrderToDatabaseFormat(requestBody) {
    return {
        orderId: requestBody.numeroPedido,
        value: requestBody["valor Total"],
        creationDate: requestBody.dataCriacao,

        items: requestBody.items.map(item => {
            return {
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorltem
            };
        })
    };
}

module.exports = { mapOrderToDatabaseFormat };