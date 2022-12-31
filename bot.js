const keepAlive = require("./server");
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env['token'];
const { EmbedBuilder } = require('discord.js');

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'apod') {
    // api request
    const request = require('request');
    request('https://api.nasa.gov/planetary/apod?api_key=cQDCapa6pSqUPx6ignf3p2ImqC7t7Lx3n26H5X9M', { json: true }, (err, res, body) => {
      if (err) { return console.log(err); }

      // creating embed object
      const apodEmbed = new EmbedBuilder()
      .setColor(0x5D3FD3)
      .setTitle('Astronomy Picture Of The Day')
      .setDescription(body.explanation)
	    .setImage(body.url);

      interaction.channel.send({ embeds: [apodEmbed]});
    });
  }
});

keepAlive();
client.login(TOKEN);
