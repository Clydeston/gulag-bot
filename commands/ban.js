const global = require("../global.js");
exports.run = (bot, message, args) => {
    let guild = bot.guilds.cache.get("694513340931768340");
    const user_to_ban = message.mentions.users.first();

    var access_command = false;
    var required_roles = global.data.getCommandPermissions("purge");
    required_roles.forEach(element => {
      if(message.member.roles.cache.some(role => role.name ===element.name)) {
        access_command = true;
      }
    });
  
    if(access_command) {
        if(user_to_ban) {
            let user = guild.member(user_to_ban);
            if(!args[1]) {
                global.data.sendMessageToChannel(bot, message.channel.id, "Please provide a valid reason for the ban!");
            }else {
                ban(user, message, args[1], bot);
            }
        }else {
            global.data.sendMessageToChannel(bot, message.channel.id, "Please provide a valid mention!");
        }
    } else {
        message.reply(" Sorry you require elevated permissions!");
    } 
}

function ban(user, message, reason_for_ban, bot) {
    try {
        user.ban({days: 0, reason: reason_for_ban});
        global.data.sendMessageToChannel(bot, message.channel.id, `Successfully banned: ${user.displayName}`);
        global.data.sendMessageToChannel(bot, "695936888879710309", `${message.member.displayName} (${message.member.id}) banned: ${user.displayName} (${user.id})`, `Reason: ${reason_for_ban}`);
    }catch(err) {
        console.log(err);
    }   
}
