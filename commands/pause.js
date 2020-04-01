
exports.run = (bot, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if(!fetched) {
        message.channel.send({embed:{        
            description: "No music is being played!",
            color: 0x42F100    
        }});
    }
    
    if(message.member.voiceChannel !== message.guild.me.voiceChannel) {
        message.channel.send({embed:{        
            description: "You're not in the same channel as me!",
            color: 0x42F100    
        }});
    }

    if(fetched.dispatcher.paused) {
        message.channel.send({embed:{        
            description: "Already paused chief!",
            color: 0x42F100    
        }});
    }

    fetched.dispatcher.pause();
    message.channel.send({embed:{        
        description: `Paused: ${fetched.queue[0].songTitle}`,
        color: 0x42F100    
    }});
  
  }
  