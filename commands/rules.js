const Discord = require("discord.js");
const rules = require("./rules.json");
const global = require("../global.js");

exports.run = (bot, message, args) => {

    const embed = new Discord.MessageEmbed();
    embed.setTitle("Prison Rules!");
    embed.setColor("0x42F100");

    var message_channel = "";
    for(var i = 0; i < rules.rules.length; i++) {
        var capitalised_name = rules.rules[i].name.charAt(0).toUpperCase() + rules.rules[i].name.slice(1);
        var capitalised_desc = rules.rules[i].description.charAt(0).toUpperCase() + rules.rules[i].description.slice(1);
        
        message_channel = message_channel + `\n **${capitalised_name}**\n${capitalised_desc}`;        
    }

    embed.setDescription(message_channel);
    message.channel.send(embed);  
  }
  