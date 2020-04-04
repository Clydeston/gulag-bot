const global = require("../global.js");
exports.run = (bot, message, args) => {
    let guild = bot.guilds.cache.get("694513340931768340");
    const user_to_kick = message.mentions.users.first();

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
}

function kick(user, message, reason_for_kick, bot) {
    try {
        user.kick(reason_for_kick);
        global.data.sendMessageToChannel(bot, message.channel.id, `Successfully kicked: ${user.displayName}`);
        global.data.sendMessageToChannel(bot, "695936888879710309", `${message.member.displayName} kicked: ${user.displayName}`, `Reason: ${reason_for_kick}`);
    }catch(err) {
        console.log(err);
    }   
}
  