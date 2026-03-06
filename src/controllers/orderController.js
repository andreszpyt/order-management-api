const Order = require('../models/Order');
const { mapOrderToDatabaseFormat } = require('../services/orderMapper');

async function createOrder(req, res, next) {
    try {
        const mappedData = mapOrderToDatabaseFormat(req.body);
        const newOrder = new Order(mappedData);
        await newOrder.save();
        return res.status(201).json(newOrder);
    } catch (error) {
        next(error);
    }
}

async function getOrderById(req, res, next) {
    try {
        const { id } = req.params;
        const order = await Order.findOne({ orderId: id });

        if (!order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json(order);
    } catch (error) {
        next(error);
    }
}

async function getAllOrders(req, res, next) {
    try {
        const orders = await Order.find();
        return res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
}

async function updateOrder(req, res, next) {
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
        next(error);
    }
}

async function deleteOrder(req, res, next) {
    try {
        const { id } = req.params;
        const deletedOrder = await Order.findOneAndDelete({ orderId: id });

        if (!deletedOrder) {
            return res.status(404).json({ message: "Pedido não encontrado para exclusão." });
        }

        return res.status(200).json({ message: "Pedido deletado com sucesso." });
    } catch (error) {
        next(error);
    }
}

module.exports = { createOrder, getOrderById, getAllOrders, updateOrder, deleteOrder };