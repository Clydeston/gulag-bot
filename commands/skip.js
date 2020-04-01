exports.run = async (bot, message, args, ops) => {

  let fetched = ops.active.get(message.guild.id);

  if(!fetched) return message.channel.send({embed:{
    title: `Sorry!`,
    description: "There currently isn't any music playing!",
    color: 0xd30655
  }});

  if(message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send({embed:{
    title: `Sorry!`,
    description: "You're not in the same voice channel as me!",
    color: 0xd30655
  }});

  let userCount = message.member.voice.channel.members.size;

  let required = Math.ceil(userCount/2);

  if(!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

  if(fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send({embed:{
    title: `Sorry!`,
    description: `You've already voted to skip: ${fetched.queue[0].voteSkips.length}/${required} required!`,
    color: 0xd30655
  }});

  fetched.queue[0].voteSkips.push(message.member.id);

  ops.active.set(message.guild.id, fetched);

  if(fetched.queue[0].voteSkips.length >= required) {

    message.channel.send({embed:{
      title: `Skipped song!`,
      color: 0xd6c211
    }});

    return fetched.dispatcher.emit("end");

  }else if(message.member.roles.cache.some(role => role.name === "Moderator") || message.member.roles.cache.some(role => role.name === "Admin") || message.member.roles.cache.some(role => role.name === "Warden")) {
    return fetched.dispatcher.emit("end");
  }

  message.channel.send({embed:{
    title: `Voted to skip: ${fetched.queue[0].voteSkips.length}/${required} required!`,
    color: 0xd6c211
  }});
}
