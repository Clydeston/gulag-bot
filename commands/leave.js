exports.run = (bot, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if(!message.member.voice.channel) return message.channel.send({embed:{
    title:"Sorry!",
    description: "Please connect to a voice channel!",
    color: 0xd30655
  }});

  if(!message.guild.me.voice.channel) return message.channel.send({embed:{
    title:"Sorry!",
    description: "I'm not currently in a voice channel!",
    color: 0xd30655
  }});

  if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send({embed:{
    title:"Sorry!",
    description: "Please connect to my current voice channel!",
    color: 0xd30655
  }});

  message.guild.me.voice.channel.leave();
  //delete fetched["queue"];
  ///fetched = null;

  message.channel.send({embed:{
    title:"Bye Bye",
    description: "Be seeing you around...",
    color: 0xd30655
  }});
}
