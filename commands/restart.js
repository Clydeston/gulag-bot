const { exec, spawn } = require('child_process');
const global = require("../global.js");
const config = require("../config.json");
const ping = require("tcp-ping");

function restart(bot, message) {
    const bat = spawn(config.server_path, ['a', 'b'], { detached: true });    
    bat.unref();  
    global.data.sendMessageToChannel(bot, message.channel.id, "Server restarted!");
}

exports.run = (bot, message, args) => {

  var access_command = false;
    var required_roles = global.data.getCommandPermissions("restart");
    required_roles.forEach(element => {
      if(message.member.roles.cache.some(role => role.name === element.name)) {
        access_command = true;
      }

      if(access_command) {             
        ping.probe(config.server_ip, 25565, function(err, data) {
          if(err) {
            console.log(err);
          }else{
            if(!data) {
              restart(bot, message);
            }else{
              message.reply("The server is not dead!");
            }
          }          
        });
      
      }else {
        message.reply("Sorry you require elevated permissions!");
      }
    });
   
  }
  