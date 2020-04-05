const global = require("../global.js");
exports.run = (bot, message, args) => {
    let guild = bot.guilds.cache.get("694513340931768340");
    const user_to_kick = message.mentions.users.first();

    var access_command = false;
    var required_roles = global.data.getCommandPermissions("kick");
    required_roles.forEach(element => {
      if(message.member.roles.cache.some(role => role.name === element.name)) {
        access_command = true;
      }
    });
  
    if(access_command) {        
        if(user_to_kick) {
            let user = guild.member(user_to_kick);
            if(!args[1]) {
                global.data.sendMessageToChannel(bot, message.channel.id, "Please provide a valid reason for the kick!");
            }else {
                kick(user, message, args[1], bot);
            }
        }else {
            global.data.sendMessageToChannel(bot, message.channel.id, "Please provide a valid mention!");
        }
    } else {
        message.reply(" Sorry you require elevated permissions!");
    } 
}

function kick(user, message, reason_for_kick, bot) {
    try {
        user.kick(reason_for_kick);
        global.data.sendMessageToChannel(bot, message.channel.id, `Successfully kicked: ${user.displayName}`);
        global.data.sendMessageToChannel(bot, "695936888879710309", `${message.member.displayName} (${message.member.id}) kicked: ${user.displayName} (${user.id})`, `Reason: ${reason_for_kick}`);
    }catch(err) {
        console.log(err);
    }   
}
