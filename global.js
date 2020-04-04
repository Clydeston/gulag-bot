const commands = require("./commands/commands.json");
const Discord = require("discord.js");

var methods = {};

this.commands= null;

methods.getCommandPermissions = function(command_name) {
    var return_val;
    commands.commands.forEach(command => {
        if(command.name == command_name) {            
            return_val = command.roles;          
        }
    });
    return return_val;
}

methods.sendMessageToChannel = function(bot, channel_id, title, description = null, colour = "0x42F100") {
  let channel = bot.channels.cache.get(channel_id);
  
  const embed = new Discord.MessageEmbed();
  embed.setTitle(title);
  if(description) {
    embed.setDescription(description)
  }  
  embed.setColor(colour);

  channel.send(embed);
}

exports.data = methods;

/* 
  var access_command = false;
  var required_roles = global.data.getCommandPermissions("purge");
  required_roles.forEach(element => {
    if(message.member.roles.cache.some(role => role.name ===element.name)) {
      access_command = true;
    }
  });

  if(access_command) {
      purge();
  } else {
      message.reply(" Sorry you require elevated permissions!");
  } 
*/
