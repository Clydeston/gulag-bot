exports.run = (bot, message, args) => {

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
        message.channel.send({embed:{
            title:`${args[0]} reloaded!`,
            color: 0x42F100
        
        }});
    }catch (e){
        message.channel.send({embed:{
            title:"Unable to reload this command!",
            color: 0x42F100        
        }});
    }
  }
  