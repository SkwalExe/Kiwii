module.exports = {
          name: "id",
          description: "Get the ID of an user",
          guildOnly: false,
          use: "id @user",
          type: "tool",
          aliases: [],

          execute(message, args) {
                    const Discord = require('discord.js');
                    const bot = require('../bot');


                    const user = message.mentions.users.first() || message.author


                    const embed = new bot.Discord.MessageEmbed()

                              .setColor('PURPLE')
                              .setTitle(`ID of ${user.username}`)
                              .setDescription('```' + user.id + '```')

                    message.channel.send(embed)
                    return
          }
}