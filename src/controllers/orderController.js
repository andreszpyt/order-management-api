const Order = require('../models/Order');
const { mapOrderToDatabaseFormat } = require('../services/orderMapper');

async function createOrder(req, res) {
    try {
        const mappedData = mapOrderToDatabaseFormat(req.body);

        const newOrder = new Order(mappedData);

        await newOrder.save();

        return res.status(201).json(newOrder);

    } catch (error) {
        return res.status(400).json({
            message: "Erro ao criar o pedido. Verifique os dados enviados.",
            error: error.message
        });
    }
}

async function getOrderById(req, res) {
    try {
        const { id } = req.params;

        const order = await Order.findOne({ orderId: id });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json(order);

    } catch (error) {
        return res.status(500).json({ message: "Erro interno do servidor.", error: error.message });
    }
}

module.exports = { createOrder, getOrderById };