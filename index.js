const { REST, Routes } = require('discord.js');
const TOKEN = process.env['token'];
const CLIENT_ID = process.env['client_id'];
const GUILD_ID = process.env['guild_id'];
const rest = new REST({ version: '10' }).setToken(TOKEN);

const commands = [
  {
    name: 'apod',
    description: 'Replies whith the astronomy picture of the day!',
  },
];

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
