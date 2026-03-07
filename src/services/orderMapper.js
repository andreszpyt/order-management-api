// Função de mapper do JSON

function mapOrderToDatabaseFormat(requestBody) {
    return {
        orderId: requestBody.numeroPedido,
        value: requestBody["valorTotal"],
        creationDate: requestBody["dataCriacao"],

        items: requestBody.items.map(item => {
            return {
                productId: parseInt(item.idItem),
                quantity: item.quantidadeItem,
                price: item.valorItem
            };
        })
    };
}

module.exports = { mapOrderToDatabaseFormat };