exports.run = (bot, message, args) => {

    message.channel.send({embed:{
      title:"Brabbs!",
      description: "https://www.youtube.com/watch?v=2YwKWteqzo8",
      color: 0x42F100
  
    }}).then(dl => dl.delete(3000));
  
  }
  