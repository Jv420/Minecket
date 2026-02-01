const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('Webhook error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    
    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            
            // Hier kun je:
            // 1. Email sturen naar koper
            // 2. Opslaan in database
            // 3. Commando toevoegen voor Minecraft server
            
            console.log('Payment completed for:', session.metadata.minecraft_name);
            console.log('Session:', session.id);
            
            // TODO: Add your logic here
            // For example, save to a database or send to your Minecraft server
            
            break;
            
        case 'payment_intent.succeeded':
            console.log('Payment succeeded');
            break;
            
        default:
            console.log(`Unhandled event type: ${event.type}`);
    }
    
    res.json({ received: true });
};