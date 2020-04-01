const global = require("../global.js");
exports.run = (client, message, args, tools) => {

  function purge () {
    if(!args[0] || isNaN([args[0]])) return message.channel.send("Please provide a valid integer!");
    if (args[0] > 100) return message.reply("Please input an integer 100 or less!");
  
    message.channel.bulkDelete(args[0])//.then(message.channel.send("Deleted").then(dl => {dl.delete(3000); }))
    .catch(error => message.channel.send(`Error ${error.message}`));
  }
  
  var access_command = false;
  var required_roles = global.data.getCommandPermissions("purge");
  required_roles.forEach(element => {
    if(message.member.roles.cache.some(role => role.name ===element.name)) {
      access_command = true;
    }
  });

  if(access_command) {
      purge();
  } else {
      message.reply(" Sorry you require elevated permissions!");
  }

};
