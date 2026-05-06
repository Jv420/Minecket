const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const axios = require('axios');
const mysql = require('mysql2/promise');
const { Rcon } = require('rcon-client');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'minecraft_store'
});

// Discord webhook
const DISCORD_WEBHOOK = 'https://discord.com/api/webhooks/YOUR_WEBHOOK';

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

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;

        const username = session.metadata.minecraft_name;
        const rank = session.metadata.rank;
        const amount = session.amount_total / 100;

        console.log(`✅ Payment for ${username} - Rank: ${rank}`);

        try {
            // 💾 1. Opslaan in database
            await pool.query(
                'INSERT INTO purchases (minecraft_name, rank, amount, stripe_session_id) VALUES (?, ?, ?, ?)',
                [username, rank, amount, session.id]
            );

            // 🎮 2. Minecraft command sturen via RCON
            const rcon = await Rcon.connect({
                host: "127.0.0.1",
                port: 25575,
                password: "STERKWACHTWOORD"
            });

            // LuckPerms command
            await rcon.send(`lp user ${username} parent add ${rank}`);

            await rcon.end();

            console.log("🎮 Rank gegeven aan speler!");

            // 💬 3. Discord melding
            await axios.post(DISCORD_WEBHOOK, {
                content: `💰 **Nieuwe aankoop!**
👤 Speler: ${username}
🏷️ Rank: ${rank}
💵 Bedrag: €${amount}`
            });

            console.log("📢 Discord melding verstuurd!");

        } catch (error) {
            console.error("❌ Fout:", error);
        }
    }

    res.json({ received: true });
};
