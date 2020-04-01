const commands = require("./commands/commands.json");

var methods = {};

methods.sum = function(one, two) {
    return one + two;
}

this.commands= null;

methods.getCommandPermissions = function(command_name) {
    var return_val;
    commands.commands.forEach(command => {
        if(command.name == command_name) {            
            return_val = command.roles;          
        }
    });
    return return_val;
}

exports.data = methods;

/* 
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
*/
