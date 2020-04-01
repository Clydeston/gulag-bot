exports.run = (bot, message, args) => {

  message.channel.send({embed:{
    title:"Pong!",
    color: 0x42F100

  }}).then(dl => dl.delete(3000));

}
