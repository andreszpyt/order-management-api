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

async function getAllOrders(req, res) {
    try {
        const orders = await Order.find();

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar os pedidos.", error: error.message });
    }
}

async function updateOrder(req, res) {
    try {
        const { id } = req.params;

        const mappedData = mapOrderToDatabaseFormat(req.body);

        const updatedOrder = await Order.findOneAndUpdate(
            { orderId: id },
            mappedData,
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido não encontrado para atualização." });
        }

        return res.status(200).json(updatedOrder);
    } catch (error) {
        return res.status(400).json({ message: "Erro ao atualizar o pedido. Verifique os dados.", error: error.message });
    }
}

async function deleteOrder(req, res) {
    try {
        const { id } = req.params;

        const deletedOrder = await Order.findOneAndDelete({ orderId: id });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Pedido não encontrado para exclusão." });
        }

        return res.status(200).json({ message: "Pedido deletado com sucesso." });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao deletar o pedido.", error: error.message });
    }
}

module.exports = { createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder };
