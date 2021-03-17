const { exec, spawn } = require('child_process');
const global = require("../global.js");
const config = require("../config.json");
const fs = require("fs");
var net = require('net');
const { resolve } = require('path');
var last_executed;

function restart(bot, message) {   
  const bat = spawn(config.server_path, ['a', 'b'], { detached: true });    
  bat.unref();  
  global.data.sendMessageToChannel(bot, message.channel.id, "Server restarted!");  
  storeDate();
}

function storeDate() {
  var content = JSON.stringify({last_exec: new Date()});
  
  fs.writeFile('./commands/restart.json', content, 'utf8', function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Saved");
  }); 
}

var readDate = function(file) {
  return new Promise(function(res, rej) {
    fs.readFile(file, function(err, data) {
        if (err) {
          console.log(err);
        } else {
          res(data);
          last_executed = new Date(JSON.parse(data).last_exec);
        }
    })
  })
}

exports.run = (bot, message, args) => {  

  if(global.data.hasCommandAccess("restart", message)) {

    readDate("./commands/restart.json").then(function(data) {
      var server = net.createServer();
    
      server.once('error', function(err) {
        if (err.code === 'EADDRINUSE') {
          message.reply("Server is not dead!");
        }
      });
     
      server.once('listening', function() {    
        server.close();
        if(last_executed == 0) {
          restart(bot, message);
        }else {  
          var current_time = new Date();
          var diffMs = (current_time - last_executed); 
          var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);     
          if(diffMins < 3) {
            message.reply("Please allow time for the server to start before restarting!");  
            console.log(diffMins);
          }else{
            restart(bot, message);
          }
        }      
      });
     server.listen(25565);
    });

  }else{
    message.reply("You require elevated permissions!");
  }  
  
}
  