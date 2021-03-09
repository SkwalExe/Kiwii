module.exports = {
          name: "love",
          description: "Find the perfect couple",
          guildOnly: true,
          use: "love",
          type: "Fun",
          aliases: [],

          execute(message, args) {
                    const Discord = require('discord.js');
                    const bot = require('../bot');



                    var userArray = message.mentions.members.array()
                    var user = userArray[0]
                    var user2 = userArray[1]
                    if (user) {
                              if (user2) {
                                        var name1 = user.displayName
                                        var name2 = user2.displayName
                                        var name = name1.substring(0, (name1.length / 2)) + name2.substring((name2.length / 2), 30)
                                        var embed = new Discord.MessageEmbed()
                                                  .setColor('RED')
                                                  .setTitle(`Love between ${name1} and ${name2} ❤`)
                                                  .setDescription(`He / She will be called **${name}** 😘`)
                                        message.channel.send(embed)
                              } else {
                                        var name1 = user.displayName
                                        var name2 = message.guild.members.cache.filter(r => !r.user.bot).random().displayName
                                        var name = name1.substring(0, (name1.length / 2)) + name2.substring((name2.length / 2), 30)
                                        var embed = new Discord.MessageEmbed()
                                                  .setColor('RED')
                                                  .setTitle(`Love between ${name1} and ${name2} ❤`)
                                                  .setDescription(`He / She will be called **${name}** 😘`)
                                        message.channel.send(embed)
                              }

                    } else {
                              var name1 = message.guild.members.cache.filter(r => !r.user.bot).random().displayName
                              var name2 = message.guild.members.cache.filter(r => !r.user.bot).random().displayName
                              var name = name1.substring(0, (name1.length / 2)) + name2.substring((name2.length / 2), 30)
                              var embed = new Discord.MessageEmbed()
                                        .setColor('RED')
                                        .setTitle(`Love between ${name1} and ${name2} ❤`)
                                        .setDescription(`He / She will be called **${name}** 😘`)
                              message.channel.send(embed)
                    }
          }
}