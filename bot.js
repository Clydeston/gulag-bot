const Discord = require("discord.js");
const bot = new Discord.Client();
const confiG = require("./config.json");
const ownerID = "270659027262767105";
const active = new Map();
const global = require("./global.js")

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
	 global.data.sendMessageToChannel(bot, message.channel.id, "This command doesn't exist! Try using !help for more info!");
  }
});

bot.on("guildMemberAdd", member => {
  	var Role = member.guild.roles.cache.get("694557751812292780");

  	member.roles.add(Role);

  	bot.channels.cache.get(serverStats.totalUsersID).setName(`Current Prisoners: ${member.guild.memberCount - member.guild.members.cache.filter(m => m.user.bot).size}`);
	bot.channels.cache.get(serverStats.botCountID).setName(`Robot Count: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

	global.data.sendMessageToChannel(bot, "695936832273121310", `User: ${(member.displayName)} | ${member.id}`,"Member joined us!");
});

bot.on("guildMemberRemove", member => {

	bot.channels.cache.get(serverStats.totalUsersID).setName(`Current Prisoners: ${member.guild.memberCount - member.guild.members.cache.filter(m => m.user.bot).size}`);
	bot.channels.cache.get(serverStats.botCountID).setName(`Robot Count: ${member.guild.members.cache.filter(m => m.user.bot).size}`);

	global.data.sendMessageToChannel(bot, "695936869145247744", `User: ${(member.displayName)} | ${member.id}`, "Member left the server.");
	
});

bot.on("ready", () => {
	console.log("Bot Initialised!");
	
	//bot.user.setStatus("Online");
	bot.user.setActivity("Fragging peeps in the Gulag!");
});

bot.login(confiG.token);