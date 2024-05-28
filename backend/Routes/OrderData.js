const express = require("express");
const router = express.Router();
const order = require("../models/orders");
const nodemailer = require('nodemailer');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    let orderDate = req.body.order_date;
    let totalPrice = data.reduce((total, food) => total + food.price, 0);
    
    try {
        let existingUser = await order.findOne({ 'email': req.body.email });

        if (!existingUser) {
            // If the user doesn't exist, create a new entry
            await order.create({
                email: req.body.email,
                order_data: [{ Order_date: orderDate, order_data: data, total_price: totalPrice }],
            });
        } else {
            // If the user exists, update their order data
            await order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: { Order_date: orderDate, order_data: data, total_price: totalPrice } } }
            );
        }

        // Send order confirmation email
        await sendOrderConfirmationEmail(req.body.email, data, totalPrice);

        res.json({ success: true });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

// Function to send order confirmation email
const sendOrderConfirmationEmail = async (user_email, items, total) => {
    try {
        const totalWithGST = (total * 1.05).toFixed(2);
        const gst = (total * 0.05).toFixed(2);

        // Create nodemailer transporter
        let transporter = nodemailer.createTransport({
            // Configure your email service provider here
            service: 'Gmail',
            auth: {
                user: 'yashanpal143@gmail.com',
                pass: 'hecj nlng blxn hmlb',
            },
        });

        // Construct email message with a table
        let message = {
            from: 'yashanpal143@gmail.com',
            to: user_email,
            subject: 'Order Confirmation',
            html: `<h1>Order Confirmed</h1>
                   <p>Thank you for your order!</p>
                   
                   <p>Items:</p>
                   <table border="1" cellpadding="5" cellspacing="0">
                       <thead>
                           <tr>
                               <th>Name</th>
                               <th>Size</th>
                               <th>Quantity</th>
                               <th>Price</th>
                           </tr>
                       </thead>
                       <tbody>
                           ${items.map(item => `
                               <tr>
                                   <td>${item.name}</td>
                                   <td>${item.size}</td>
                                   <td>${item.qty}</td>
                                   <td>RS. ${item.price}</td>
                               </tr>`).join('')}
                       </tbody>
                   </table>
                   
                   <p>Mode: Cash on Delivery</p>
                   <p>Total: RS. ${total}</p>
                   <p>GST: RS. ${gst}</p>
                   <p>Total (including GST): RS. ${totalWithGST}</p>`,
        };

        // Send email
        let info = await transporter.sendMail(message);
        console.log('Order confirmation email sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending order confirmation email:', error);
    }
};

router.post('/MyorderData', async (req, res) => {
    try {
        let myData = await order.findOne({ 'email': req.body.email });
        res.json({ orderData: myData });
    } catch (error) {
        res.status(500).send("Server Error: " + error.message);
    }
});

router.get('/allOrderData', async (req, res) => {
    try {
        const allOrders = await order.find();
        res.json({ orderData: allOrders });
    } catch (error) {
        console.error("Error fetching all orders:", error.message);
        res.status(500).send("Server Error: " + error.message);
    }
});

module.exports = router;
