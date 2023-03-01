const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();

const COIN_NAME = 'monkeyball'; // Change this to the name of the coin you want to track
const COIN_THRESHOLD = 0.06; // Change this to the price threshold at which you want the bot's nickname and presence to change

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

async function setNicknameAndPresence() {
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${COIN_NAME}&vs_currencies=usd`);
    const currentPrice = response.data[COIN_NAME].usd;

    if (currentPrice >= COIN_THRESHOLD) {
      await client.user.setNickname(`${COIN_NAME.toUpperCase()} 🚀`);
      await client.user.setPresence({ activity: { name: `Price: $${currentPrice}` } });
    } else {
      await client.user.setNickname(COIN_NAME.toUpperCase());
      await client.user.setPresence({ activity: { name: `Price: $${currentPrice}` } });
    }
  } catch (error) {
    console.error(error);
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  setNicknameAndPresence(); // Call the function once on startup
  setInterval(setNicknameAndPresence, 60 * 1000); // Call the function every minute to update the nickname and presence
});

client.login('your-bot-token');
