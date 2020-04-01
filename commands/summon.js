exports.run = (bot, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);
  
    if(!message.member.voice.channel) return message.channel.send({embed:{
      title:"Sorry!",
      description: "Please connect to a voice channel!",
      color: 0xd30655
    }});
  
    let channel = bot.channels.cache.get(message.member.voice.channel.id);
    channel.join();
  }
  