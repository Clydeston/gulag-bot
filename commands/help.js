const Discord = require("discord.js");
const commands = require("./commands.json");
const global = require("../global.js");

exports.run = (bot, message, args) => {

    const embed = new Discord.MessageEmbed();
    embed.setTitle("Available Gulag Commands!");
    embed.setColor("0x42F100");

    for(var i = 0; i < commands.commands.length; i++) {
        var capitalised_name = commands.commands[i].name.charAt(0).toUpperCase() + commands.commands[i].name.slice(1);
        var capitalised_desc = commands.commands[i].description.charAt(0).toUpperCase() + commands.commands[i].description.slice(1);
        var permissions = commands.commands[i].roles;

        if(permissions[0].name == "default") {
            embed.addField(`${capitalised_name}`, `${capitalised_desc}`, false);
        }else {
          if(global.data.hasCommandAccess("purge", message)) {
            embed.addField(`${capitalised_name}`, `${capitalised_desc}`, false);
          }
        }        
    }

    message.channel.send(embed);  
  }
  