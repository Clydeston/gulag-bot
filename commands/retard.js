const global = require("../global.js");

exports.run = (bot, message, args) => {    
    const user_to_give_role = message.mentions.users.first();
    let guild = bot.guilds.cache.get("694513340931768340");

    var access_command = false;
    var required_roles = global.data.getCommandPermissions("kick");
    required_roles.forEach(element => {
        if(message.member.roles.cache.some(role => role.name === element.name)) {
        access_command = true;
        }
    });

    if(access_command) {        
        if(!user_to_give_role) {
            global.data.sendMessageToChannel(bot, message.channel.id, "Please provide a valid mention!");
        }else if(user.id == message.author.id){
            global.data.sendMessageToChannel(bot, message.channel.id, "You deserve it... But no!");
        }else{
            let user = guild.member(user_to_give_role);
            var role = guild.roles.cache.get("801941666306588675");
            if(user.roles.cache.find(r => r.id == "801941666306588675")){
                global.data.sendMessageToChannel(bot, message.channel.id, "User is already dribbling!");
            }else{
                user.roles.add(role);
                global.data.sendMessageToChannel(bot, message.channel.id, "Member is now retarded!");
            }
        }
    } else {
        message.reply("Sorry you require elevated permissions!");
    }   
}
// wrote this while tired - TODO CHECK LATER