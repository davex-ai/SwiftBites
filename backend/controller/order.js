import { placeOrder, getMyOrders, getOrder} from "../utils/order.js";

export async function createOrder(req, res) {
    try {
        const orderData = {
            ...req.body,
            user: req.user.id   
        };

        const order = await placeOrder(orderData);

        res.status(201).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getUserOrders(req, res) {
    try {
        const orders = await getMyOrders(req.user.id);

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function getOrderById(req, res) {
    try {
        const order = await getOrder(req.params.id);

        if (!order)
            return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export async function updateOrderStatus(req, res) {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );

        if (!order)
            return res.status(404).json({ message: "Order not found" });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
