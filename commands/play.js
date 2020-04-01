const ytdl = require("ytdl-core");
const { getInfo } = require("ytdl-getinfo");

exports.run = async (bot, message, args, ops) => {

  //Input validation

  if(!message.member.voice.channel) return message.channel.send({embed:{
    title:"Sorry!",
    description: "Please connect to a voice channel!",
    color: 0xd30655
  }});

  if(!args[0]) return message.channel.send({embed:{
    title:"Oh Snap!",
    description: "Please enter a video, URL or playlist!",
    color: 0xd30655
  }});

  let validate = await ytdl.validateURL(args[0]);

  if(!validate) return message.channel.send({embed:{
    title:"Sorry!",
    description: "Please input a valid URL!",
    color: 0xd30655
  }});

  let info = await ytdl.getInfo(args[0]);

  let data = ops.active.get(message.guild.id) || {};

  if(!data.connection) data.connection = await message.member.voice.channel.join();
  if(!data.queue) data.queue = [];
  data.guildID = message.guild.id;

  //Adding song to queue
  data.queue.push({
    songTitle: info.title,
    requester: message.author.tag,
    url: args[0],
    announceChannel: message.channel.id
  });

  if(!data.dispatcher) play(bot, ops, data);
  else{
    message.channel.send({embed:{
      title: `Song added to queue: ${info.title}`,
      description: `-Requested by: ${data.queue[0].requester}`,
      color: 0xd6c211
    }});
  }

  ops.active.set(message.guild.id, data);

}

//Play function
async function play(bot, ops, data) {

  bot.channels.cache.get(data.queue[0].announceChannel).send({embed:{
    title: `Now playing: ${data.queue[0].songTitle}`,
    description: `-Requested by: ${data.queue[0].requester}`,
    color: 0xd6c211
  }});

  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { filter: "audioonly"}));
  data.dispatcher.guildID = data.guildID;

  data.dispatcher.once("end", function() {

    end(bot, ops, this);

  });
}

function end(bot, ops, dispatcher) {

  let fetched = ops.active.get(dispatcher.guildID);

  fetched.queue.shift();

  if(fetched.queue.length > 0){

    ops.active.set(dispatcher.guildID, fetched);

    play(bot, ops, fetched);

  }else {

    ops.active.delete(dispatcher.guildID);

    let vc = bot.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if(vc) vc.leave();

  }
}
