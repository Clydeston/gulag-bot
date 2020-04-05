const yt_search = require("yt-search");
const play = require("./p.js");
const Discord = require("discord.js");

exports.run = (bot, message, args, ops) => {

    yt_search(args.join(" "), function(err, results) {
        if(err) {
            return message.channel.send({embed:{
                title:"An error occured, please try again!",
                color: 0x42F100
            
            }});
        }

        const embed = new Discord.MessageEmbed();
        embed.setTitle("Available videos!");
        embed.setColor("0x42F100");

        let video_result = results.videos.slice(0, 10);
        
        if(video_result.length < 10) {
            return message.channel.send({embed:{
                title:"Please search again",
                color: 0x42F100
            
            }});
        }else {
            for(var i = 0; i < video_result.length; i++) {
                embed.addField(`${i+1}.`, `${video_result[i].title}`, false);
            }
        }


        embed.setFooter('Choose a number from the list above!');
        message.channel.send(embed);

        const filter = m => !isNaN(m.content) && m.content < video_result.length + 1 && m.content > 0;
        const message_collector = message.channel.createMessageCollector(filter);

        message_collector.videos = video_result;

        message_collector.once("collect", function(m) {
            play.run(bot, message, [this.videos[parseInt(m.content) - 1].url], ops);
        });

    });
};
  