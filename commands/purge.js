const global = require("../global.js");
exports.run = (client, message, args, tools) => {

  function purge () {
    if(!args[0] || isNaN([args[0]])) return message.channel.send("Please provide a valid integer!");
    if (args[0] > 100) return message.reply("Please input an integer 100 or less!");
  
    message.channel.bulkDelete(args[0])
    .catch(error => message.channel.send(`Error ${error.message}`));
  }
  
  if(global.data.hasCommandAccess("purge", message)) {
    purge();
  }else{
    message.reply(" Sorry you require elevated permissions!");
  }

};
