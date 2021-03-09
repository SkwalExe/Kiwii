module.exports = {
          name: "slowmode",
          description: "Set the slowmode of the current channel",
          guildOnly: false,
          use: "slowmode 10",
          type: "Moderation",
          require: 'MANAGE_CHANNELS',
          aliases: ["slow"],

          execute(message, args) {
                    const Discord = require('discord.js');
                    const bot = require('../bot');
                    if (!args) {
                              message.channel.setRateLimitPerUser(0);
                              bot.embed(message, "Slowmode successfully set to 0")
                              return
                    }

                    if (isNaN(args)) return bot.derror(message, "You must specify a NUMBER !")
                    if (parseInt(args) > 21600) return derror(message, "value should be less than or equal to 21600 !")

                    message.channel.setRateLimitPerUser(parseInt(args), "Requested by " + message.member.displayName)
                    bot.embed(message, "Slowmode successfully set to " + slowmode)

          }
}