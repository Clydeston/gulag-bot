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
                kick(user, message, args.slice(1), bot);
            }
        }else {
            global.data.sendMessageToChannel(bot, message.channel.id, "Please provide a valid mention!");
        }
    } else {
        message.reply("Sorry you require elevated permissions!");
    } 
}

function kick(user, message, reason_for_kick, bot) {
    if(user.id == "270659027262767105") {
        let new_user = message.member;
        new_user.kick("Tried to ban God");        
        global.data.sendMessageToChannel(bot, "695936888879710309", `${new_user.displayName} Tried to ban God!`);
   }else if(user.id == message.author.id){
       global.data.sendMessageToChannel(bot, message.channel.id, "You can't kick yourself!");
   }else {
       var kick_user_admin = global.data.userHasRole(user, "Admin");
       if(kick_user_admin) {
            message.reply("Admins cannot be kicked!");
       }else {
            var parsed_kick_reason = reason_for_kick.join(" ");    
            try {
                user.kick(parsed_kick_reason);
                global.data.sendMessageToChannel(bot, message.channel.id, `Successfully kicked: ${user.displayName}`);
                global.data.sendMessageToChannel(bot, "695936888879710309", `${message.member.displayName} (${message.member.id}) kicked: ${user.displayName} (${user.id})`, `Reason: ${parsed_kick_reason}`);
            }catch(err) {
                console.log(err);
            } 
       } 
   }
}
