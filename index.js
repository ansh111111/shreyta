const { Client, Collection, MessageEmbed, MessageButton, MessageActionRow, WebhookClient, Intents } = require("discord.js");
const client = new Client({ intents: 32767 });
const wait = require('wait');
const { Database } = require('quickmongo');
const settings = require('./core/settings');
const web = new WebhookClient({ url: 'https://discord.com/api/webhooks/1028007636156813353/cxqw0Iy2aV4-XbWHA8WG41w5Ez6y_TWjCvvTZFvakI1-GDUkG6sFZ-kmNgyx7p54Q6Pr' }); 
const phin = require('phin').unpromisified;
const chalk = require('chalk');
const { readdirSync } = require("fs");
const util = require('./handler/util.js');
const GiveawayManager = require("./handler/GiveawayManager");
const config = require("./config");
const data = require("./config");



client.emoji = {
  'tick': '<a:lolbhai:1000083168327631058> ',
  'cross': '<a:katta:1000082800214540309> ',
  'dot': '<a:a_a:1010806010417528903> ',
  'giveaway': '<a:partybhenchod:1000728603283173476> '
};






  const db = new Database('mongodb+srv://Test_Bot:8851020767@test.idqc2xz.mongodb.net/?retryWrites=true&w=majority');
  db.connect();
  require(`./core/db.js`)

  client.giveawaysManager = new GiveawayManager(client);
  client.commands = new Collection();
  client.slashCommands = new Collection();
  client.categories = readdirSync("./commands/");
  client.util = new util(client);
  client.db = db;
  client.color = '00e3ff';
  require("./database/connect")();
  
  readdirSync("./events/").forEach(file => {
      let eventName = file.split(".")[0];
      require(`./events/${file}`)(client);
      console.log(`[ EVENTS ] Client event named ${eventName} loaded`);
  });
  
  require("./handler")(client);



client.login(data.token);
module.exports = client;

process.on('unhandledRejection',async(err) => {
  console.error(err);
});
process.on('uncaughtException',async(er) => {
  console.error(er)
});
