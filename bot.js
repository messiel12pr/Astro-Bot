const keepAlive = require("./server");
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN = process.env['token'];
const { EmbedBuilder } = require('discord.js');

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  if (interaction.commandName === 'apod') {
    // api request for astronomy picture of the day
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

  else if(interaction.commandName === 'rover') {
    // api request for a picture taken by the mars rover on a given date
    const request = require('request');
    request('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=cQDCapa6pSqUPx6ignf3p2ImqC7t7Lx3n26H5X9M&earth_date='+interaction.options.getString('date'), {json: true}, (err, res, body) => {
      if(err) {return console.log(err); }

      const roverEmbed = new EmbedBuilder()
      .setColor(0x5D3FD3)
      .setTitle('Photo taken by Mars '+ body.photos[0].rover.name + ' Rover on ' + interaction.options.getString('date'))
      .setImage(body.photos[0].img_src);

      interaction.channel.send({ embeds: [roverEmbed]});
    });
  }
});

keepAlive();
client.login(TOKEN);
