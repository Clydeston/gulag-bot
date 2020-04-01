const Discord = require("discord.js");
const bot = new Discord.Client();
const confiG = require("./config.json");
const ownerID = "270659027262767105";
const active = new Map();

const serverStats = {
	totalUsersID: "694514637726547999",
	botCountID: "694514935127867443"
};

bot.on("message", message => {

let args = message.content.slice(confiG.prefix.length).trim().split(" ");
let cmd = args.shift().toLowerCase();

if(message.author.bot) return;
if(!message.content.startsWith(confiG.prefix)) return;

try {
  delete require.cache[require.resolve(`./commands/${cmd}.js`)];
  let ops = {
    ownerID: ownerID,
    active: active
  }
  let commandFile = require(`./commands/${cmd}.js`);
  commandFile.run(bot, message, args, ops);

  } catch (e) {	  	  
	  console.log(e);
	  message.channel.send({embed:{
		title:"This command doesn't exist! Try using !help for more info!",
		color: 0x42F100	
	  }});
  }
});

bot.on("guildMemberAdd", member => {
  	var Role = member.guild.roles.find("name", "Prisoners");

  	member.addRole(Role);

  	bot.channels.get(serverStats.totalUsersID).setName(`Current Prisoners: ${member.guild.memberCount - member.guild.members.filter(m => m.user.bot).size}`);
	bot.channels.get(serverStats.botCountID).setName(`Robot Count: ${member.guild.members.filter(m => m.user.bot).size}`);
});

bot.on("guildMemberRemove", member => {

	bot.channels.get(serverStats.totalUsersID).setName(`Current Prisoners: ${member.guild.memberCount - member.guild.members.filter(m => m.user.bot).size}`);
	bot.channels.get(serverStats.botCountID).setName(`Robot Count: ${member.guild.members.filter(m => m.user.bot).size}`);
	
});

bot.on("ready", () => {
	console.log("Bot Initialised!");
	
	//bot.user.setStatus("Online");
	bot.user.setActivity("Fragging niggas in the Gulag!");
});

bot.login(confiG.token);