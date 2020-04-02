
exports.run = async (bot, message, args, ops ) => {

  let fetched = ops.active.get(message.guild.id);

  if(!fetched) return message.channel.send({embed:{
    title: `Sorry!`,
    description: "There currently isn't any music playing!",
    color: 0xd30655
  }});

  let queue = fetched.queue;
  let nowPlaying = queue[0];

  if(nowPlaying != null) {
    let response = `__**Now playing**__\n\n	***${nowPlaying.songTitle}\n\n*** __**-Requested by**__\n\n ***${nowPlaying.requester}***\n\n__**Queue**__\n\n`;

    for(var i = 1; i < queue.length; i++) {
  
      response += `***${i}. ${queue[i].songTitle}***\n __**-Requested by**__ \n ***${nowPlaying.requester}***\n\n `;
  
    }

    message.channel.send({embed:{
      description: (response),
      color: 0xd6c211
    }});
  }else {
    message.channel.send({embed:{
      description: ("There currently isn't any music playing!"),
      color: 0xd6c211
    }});
  }
}
