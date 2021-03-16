const { exec, spawn } = require('child_process');
const global = require("../global.js");
const config = require("../config.json");


exports.run = (bot, message, args) => {

  var access_command = false;
    var required_roles = global.data.getCommandPermissions("restart");
    required_roles.forEach(element => {
      if(message.member.roles.cache.some(role => role.name === element.name)) {
        access_command = true;
      }

      if(access_command) {
        const bat = spawn(config.server_path, ['a', 'b'], { detached: true });    
        bat.unref();  
        global.data.sendMessageToChannel(bot, message.channel.id, "Server restarted!");
      }else {
        message.reply("Sorry you require elevated permissions!");
      }
    });
    console.log("run");
   
  }
  