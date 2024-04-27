const {request, response} = require("express");
const OrderModel = require("../orders/entity");
const PaymentModel = require("./entity");

const paymentProcess = async (req, res) => {
    const {order } = req.body;

    if (!order) {
        return res.status(400).json({ message: "Datos incompletos, se requiere order ID" });
    }

    try {
        const existOrder = await OrderModel.findById(order);

        if (!existOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }

        console.log("Procesando pago...");

        setTimeout(async () => {
            if (Math.random() > 0.5) {
                console.log("Pago exitoso");
                
                try {
                    const payment = await PaymentModel.create({
                        order: existOrder._id
                    });
                    res.json({ message: "Pago realizado con éxito", paymentDetails: payment });
                } catch (error) {
                    res.status(500).json({ message: "Error al guardar el registro de pago", error: error.message });
                }
            } else {
                console.log("Error de pago");
                res.status(400).json({ message: "Error de pago" });
            }
        }, 6000);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Orden no registrada" });
    }
};

module.exports = {
    paymentProcess
}