require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const mysql = require('mysql2/promise');
const { Rcon } = require('rcon-client');

// Database pool
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Discord webhook
const DISCORD_WEBHOOK = process.env.DISCORD_WEBHOOK;

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
        console.error('❌ Webhook error:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const username = session.metadata?.minecraft_name;
        const rank = session.metadata?.rank;
        const amount = session.amount_total / 100;

        // Extra check (heel belangrijk)
        if (!username || !rank) {
            console.log("❌ Geen username of rank in metadata!");
            return res.json({ received: true });
        }

        console.log(`✅ Payment for ${username} - Rank: ${rank}`);

        try {
            // 💾 Database
            await pool.query(
                'INSERT INTO purchases (minecraft_name, rank, amount, stripe_session_id) VALUES (?, ?, ?, ?)',
                [username, rank, amount, session.id]
            );

            // 🎮 RCON connectie
            const rcon = await Rcon.connect({
                host: process.env.RCON_HOST,
                port: process.env.RCON_PORT,
                password: process.env.RCON_PASSWORD
            });

            await rcon.send(`lp user ${username} parent add ${rank}`);
            await rcon.end();

            console.log("🎮 Rank gegeven!");

            // 💬 Discord
            await axios.post(DISCORD_WEBHOOK, {
                content: `💰 **Nieuwe aankoop!**
👤 Speler: ${username}
🏷️ Rank: ${rank}
💵 Bedrag: €${amount}`
            });

            console.log("📢 Discord melding gestuurd!");

        } catch (error) {
            console.error("❌ Fout:", error);
        }
    }

    res.json({ received: true });
};
