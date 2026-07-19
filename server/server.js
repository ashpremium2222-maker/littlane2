const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Example pricing logic
const PRICING = {
    male: 1500,
    female: 1000,
    couple: 2000
};

app.post('/api/create-payment', (req, res) => {
    const { name, email, phone, gender, quantity } = req.body;
    
    const qty = parseInt(quantity, 10) || 1;
    const rate = PRICING[gender] || 1500;
    const totalAmount = rate * qty;
    
    console.log(`[Booking Request] Name: ${name}, Email: ${email}, Phone: ${phone}, Gender: ${gender}, Qty: ${qty}`);
    console.log(`[Payment] Calculating total: ${totalAmount}`);

    // Mock payment gateway response
    const mockPaymentId = `pay_${Math.random().toString(36).substr(2, 9)}`;
    const mockPaymentUrl = `https://mock-payment-gateway.com/checkout/${mockPaymentId}`;
    
    res.json({
        success: true,
        amount: totalAmount,
        paymentId: mockPaymentId,
        paymentUrl: mockPaymentUrl,
        message: 'Proceed to the payment URL to complete your booking.'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
