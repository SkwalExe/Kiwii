module.exports = {
          name: "qrcode",
          description: "Create a qrcode wich contains what you want",
          guildOnly: false,
          use: "qrcode  [ https://example.com || text ]",
          type: "Fun",
          aliases: ["qr"],

          execute(message, args) {



                    const Discord = require('discord.js');
                    const bot = require('../bot');

                    if (!args) return bot.derror(message, "You must specify a link or text")
                    if(args.length > 1900) return bot.derror(message, "Too many caracters")
                    var url = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + args;
                    url = new URL(url)

                    var embed = new Discord.MessageEmbed()
                              .setColor('PURPLE')
                              .setTitle(message.author.username + ", here is your qrcode !!")
                              .setDescription(`\`${args}\``)
                              .setImage(url);
                    message.channel.send(embed)


          }
}