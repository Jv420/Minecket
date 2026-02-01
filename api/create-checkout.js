const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { productId, productName, price, minecraftName, email, returnUrl } = req.body;
        
        // Validate Minecraft name
        if (!minecraftName || !/^[a-zA-Z0-9_]{3,16}$/.test(minecraftName)) {
            return res.status(400).json({ error: 'Invalid Minecraft name' });
        }
        
        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['ideal', 'card', 'bancontact'],
            line_items: [{
                price_data: {
                    currency: 'eur',
                    product_data: {
                        name: productName,
                        description: `For Minecraft player: ${minecraftName}`,
                        metadata: {
                            minecraft_name: minecraftName
                        }
                    },
                    unit_amount: Math.round(price * 100), // Convert to cents
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: `${returnUrl || 'https://dynathi.vercel.app/HTML/success.html'}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: 'https://dynathi.vercel.app/HTML/cancel.html',
            customer_email: email || undefined,
            metadata: {
                minecraft_name: minecraftName,
                product_id: productId
            }
        });
        
        // Here you could save to database (if you set one up)
        // For now, we'll just return the session
        
        res.status(200).json({
            sessionId: session.id
        });
        
    } catch (error) {
        console.error('Stripe error:', error);
        res.status(500).json({ 
            error: 'Payment processing failed',
            details: error.message 
        });
    }
};