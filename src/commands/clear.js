module.exports = {
          name: "clear",
          description: "Clear a number of messages or all the messages of a channel",
          guildOnly: true,
          use: "clear [ number || all ]",
          aliases: ["cls"],
          type: "Moderation",
          require: "MANAGE_MESSAGES",

          execute(message, args) {
                    const Discord = require('discord.js');
                    const bot = require('../bot');

                    if (args == "all") {
                              var position = message.channel.position
                              message.channel.clone().then(c => {
                                        c.setPosition(position)
                                        bot.embed(message, "Messages deleted successfully")
                                        message.channel.delete()

                              })
                    } else {
                              var amount = parseInt(args) + 1;
                              if (isNaN(amount)) return bot.derror(message, "You must specify a number")

                              if (amount <= 1 || amount > 100) return bot.derror(message, "You must enter a number between 1 and 99")
                              message.channel.bulkDelete(amount, true).then(() => {
                                        bot.embed(message, "Messages deleted successfully ")
                              }).catch(err => bot.error(err))
                    }


          }

}