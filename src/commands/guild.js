module.exports = {
     name: "guild",
     description: "Allows you to change server settings, such as the channel for welcome messages etc.",
     guildOnly: true,
     use: "guild [ init || welcome #channel || bye #channel || description || WelcomeMessage || ByeMessage ]",
     type: "Tool",
     aliases: ["set", "server", 'serveur', 'serverinfo', 'servinfo'],

     execute(message, args) {
          const Discord = require('discord.js');
          const bot = require('../bot');

          args = args.split(' ')
          var command = args.shift().toLowerCase()
          args = args.join(' ');


          switch (command) {
               case "init":
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    bot.db.query('SELECT * FROM guilds WHERE guildID = ? ', [message.guild.id], (err, ans) => {

                         if (ans.length > 0) return bot.derror(message, "Server already initialized");
                         bot.createGuild(message.guild.id)
                         bot.embed(message, 'Guild initialized successfully')
                    })


                    break;

               case "welcome":

                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {


                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")
                         ans = ans[0];
                         var channel = message.mentions.channels.first()
                         if (!channel) return bot.derror(message, 'You must #mention the channel you want to define')

                         bot.db.query('UPDATE guilds SET welcomeChannel = ? WHERE guildID = ?', [channel.id, message.guild.id])

                         bot.embed(message, `Channel <#${channel.id}> has been defined as a channel for welcome messages`)


                    })


                    break;
               case "description":
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    var description = args
                    if (!description) return bot.derror(message, "You must specify the description of your server")
                    bot.db.query('UPDATE guilds SET description = ? WHERE guildID = ?', [description, message.guild.id], (err, ans) => {
                         if (err) console.log(err);
                         console.log(ans);
                         bot.embed(message, 'Server description updated successfully')
                    })


                    break;

               case "bye":
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {


                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                         ans = ans[0];

                         var channel = message.mentions.channels.first()


                         if (!channel) return bot.derror(message, 'You must #mention the channel you want to define')


                         bot.db.query('UPDATE guilds SET byeChannel = ? WHERE guildID = ?', [channel.id, message.guild.id])

                         bot.embed(message, `Channel <#${channel.id}> has been defined as a channel for bye messages`)


                    })
                    break;

               case "show":
                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {

                         console.log(ans);
                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                         ans = ans[0];
                         ans.welcomeChannel ? wel = `<#${ans.welcomeChannel}>` : wel = "Not defined"
                         ans.byeChannel ? bye = `<#${ans.byeChannel}>` : bye = "Not defined"
                         description = ans.description || "Not defined"
                         welcomeMessage = ans.message || "Not defined"
                         byeMessage = ans.byeMessage || "Not defined"

                         if (ans.verified == 0) {
                              var embed = new Discord.MessageEmbed()
                                   .setTitle('__Server Informations__')
                                   .setColor('PURPLE')
                                   .setThumbnail(message.guild.iconURL({ dynamic: true }))

                                   .addField('__Basic Informations__',
                                        `>>> __**Server name**__ \n ${message.guild.name} \n⁨\n` +
                                        `__**Server ID**__ \n \`${message.guild.id}\` \n⁨\n` +
                                        `__**Server description**__ \n ${ans.description.replace('`', '\\`')} \n⁨\n` +
                                        `**__Member count 🧑__** \n ${message.guild.members.cache.size} members\n⁨\n` +
                                        `**__Channel count__** \n ${message.guild.channels.cache.size} channels\n⁨\n` +
                                        `**__Role count__** \n ${message.guild.roles.cache.size} roles\n⁨\n` +
                                        `**__Creation date__** \n ${message.guild.createdAt.toDateString()}`
                                        , true)


                                   .addField('__Server settings__',
                                        `>>> **__Welcome Channel 👋__** \n ${wel} \n⁨\n` +
                                        `**__Bye Channel 👋__** \n ${bye} \n⁨\n` +
                                        `**__Server Welcome message 👋__** \n ${welcomeMessage} \n⁨\n` +
                                        `**__Server goodbye message 👋__** \n ${byeMessage}\n`,
                                        true)
                         } else {
                              var embed = new Discord.MessageEmbed()
                                   .setTitle('__Server Informations__')
                                   .setColor('PURPLE')
                                   .setThumbnail(message.guild.iconURL({ dynamic: true }))

                                   .addField('__Verified server <a:d_valide:751807931334262824>__', "This server is verified and it is trustworthy <a:d_valide:751807931334262824> \n⁨", false)

                                   .addField('__Basic Informations__',
                                        `>>> __**Server name**__ \n ${message.guild.name} \n⁨\n` +
                                        `__**Server ID**__ \n \`${message.guild.id}\` \n⁨\n` +
                                        `__**Server description**__ \n ${ans.description.replace('`', '\\`')} \n⁨\n` +
                                        `**__Member count 🧑__** \n ${message.guild.members.cache.size} members\n⁨\n` +
                                        `**__Channel count__** \n ${message.guild.channels.cache.size} channels\n⁨\n` +
                                        `**__Role count__** \n ${message.guild.roles.cache.size} roles\n⁨\n` +
                                        `**__Creation date__** \n ${message.guild.createdAt.toDateString()}`
                                        , true)


                                   .addField('__Server settings__',
                                        `>>> **__Welcome Channel 👋__** \n ${wel} \n⁨\n` +
                                        `**__Bye Channel 👋__** \n ${bye} \n⁨\n` +
                                        `**__Server Welcome message 👋__** \n ${welcomeMessage} \n⁨\n` +
                                        `**__Server goodbye message 👋__** \n ${byeMessage}\n`,
                                        true)

                         }
                         message.channel.send(embed)

                    })
                    break;
               case "welcomemessage":
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    if (!args) return bot.derror(message, "You must specify welcome message!")
                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {
                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")
                         bot.db.query("UPDATE guilds SET message = ? WHERE guildID = ?", [args, message.guild.id], (err, ans) => {
                              bot.embed(message, "Server welcome message updated successfully")
                         })
                    })
                    break;
               case "byemessage":
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    if (!args) return bot.derror(message, "You must specify goodbye message!")


                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {
                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                         bot.db.query("UPDATE guilds SET byeMessage = ? WHERE guildID = ?", [args, message.guild.id], (err, ans) => {
                              bot.embed(message, "Server goodbye message updated successfully")
                         })
                    })
                    break;
               case "help":

                    var embed = new Discord.MessageEmbed()
                         .setColor('PURPLE')
                         .setTitle('Server customization')
                         .addField('__server init__',
                              '>>> The `' + bot.config.prefix + ' server init` command is used to initialize the server. \nTo use the other features you must necessarily go through this command'
                         )
                         .addField('__server description__',
                              '>>> The `' + bot.config.prefix + ' server description [ the description of your server ]` command is used to set the edescription of your server. '
                         )
                         .addField('__server bye__',
                              '>>> The `' + bot.config.prefix + ' server bye #channel` command is used to define the channel where the goodbye messages will be sent'
                         )
                         .addField('__server welcome__',
                              '>>> The `' + bot.config.prefix + ' server welcome #channel` command is used to define the channel where the welcome messages will be sent'
                         )
                         .addField('__server welcomeMessage__',
                              '>>> The `' + bot.config.prefix + ' server welcomeMessage [ hello <user> welcome to the server ] ` command is used to define the welcome message that will be sent when someone join the server'
                         )
                         .addField('__server byeMessage__',
                              '>>> The `' + bot.config.prefix + ' server welcomeMessage [ goodbye <user> ] ` command is used to define the goodbye message that will be sent when someone leave the server'
                         )
                    message.channel.send(embed)
                    break;
               case "reset":
                    if (!message.member.hasPermission('ADMINISTRATOR') & !bot.isSkwal(message)) return bot.derror(message, "You don't have permission to do this")

                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {

                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                         ans = ans[0];

                         bot.db.query('DELETE FROM guilds WHERE  guildID = ?', [message.guild.id])


                         bot.embed(message, "Server settings reset successfully")
                    })
                    break;
               default:
                    bot.db.query('SELECT * FROM guilds WHERE guildID = ?', [message.guild.id], (err, ans) => {

                         console.log(ans);
                         if (ans.length < 1) return bot.derror(message, "Your server is not initialized, it means that it is not registered in our database. use cup guild init to initialize your server")

                         ans = ans[0];
                         ans.welcomeChannel ? wel = `<#${ans.welcomeChannel}>` : wel = "Not defined"
                         ans.byeChannel ? bye = `<#${ans.byeChannel}>` : bye = "Not defined"
                         description = ans.description || "Not defined"
                         welcomeMessage = ans.message || "Not defined"
                         byeMessage = ans.byeMessage || "Not defined"

                         if (ans.verified == 0) {
                              var embed = new Discord.MessageEmbed()
                                   .setTitle('__Server Informations__')
                                   .setColor('PURPLE')
                                   .setThumbnail(message.guild.iconURL({ dynamic: true }))


                                   .addField('__Basic Informations__',
                                        `>>> __**Server name**__ \n ${message.guild.name} \n⁨\n` +
                                        `__**Server ID**__ \n \`${message.guild.id}\` \n⁨\n` +
                                        `__**Server description**__ \n ${ans.description.replace('`', '\\`')} \n⁨\n` +
                                        `**__Member count 🧑__** \n ${message.guild.members.cache.size} members\n⁨\n` +
                                        `**__Channel count__** \n ${message.guild.channels.cache.size} channels\n⁨\n` +
                                        `**__Role count__** \n ${message.guild.roles.cache.size} roles\n⁨\n` +
                                        `**__Creation date__** \n ${message.guild.createdAt.toDateString()}`
                                        , true)


                                   .addField('__Server settings__',
                                        `>>> **__Welcome Channel 👋__** \n ${wel} \n⁨\n` +
                                        `**__Bye Channel 👋__** \n ${bye} \n⁨\n` +
                                        `**__Server Welcome message 👋__** \n ${welcomeMessage} \n⁨\n` +
                                        `**__Server goodbye message 👋__** \n ${byeMessage}\n`,
                                        true)
                         } else {
                              var embed = new Discord.MessageEmbed()
                                   .setTitle('__Server Informations__')
                                   .setColor('PURPLE')
                                   .addField('__Verified server <a:d_valide:751807931334262824>__', "This server is verified and it is trustworthy <a:d_valide:751807931334262824> \n⁨", false)
                                   .setThumbnail(message.guild.iconURL({ dynamic: true }))
                                   .addField('__Basic Informations__',
                                        `>>> __**Server name**__ \n ${message.guild.name} \n⁨\n` +
                                        `__**Server ID**__ \n \`${message.guild.id}\` \n⁨\n` +
                                        `__**Server description**__ \n ${ans.description.replace('`', '\\`')} \n⁨\n` +
                                        `**__Member count 🧑__** \n ${message.guild.members.cache.size} members\n⁨\n` +
                                        `**__Channel count__** \n ${message.guild.channels.cache.size} channels\n⁨\n` +
                                        `**__Role count__** \n ${message.guild.roles.cache.size} roles\n⁨\n` +
                                        `**__Creation date__** \n ${message.guild.createdAt.toDateString()}`
                                        , true)


                                   .addField('__Server settings__',
                                        `>>> **__Welcome Channel 👋__** \n ${wel} \n⁨\n` +
                                        `**__Bye Channel 👋__** \n ${bye} \n⁨\n` +
                                        `**__Server Welcome message 👋__** \n ${welcomeMessage} \n⁨\n` +
                                        `**__Server goodbye message 👋__** \n ${byeMessage}\n`,
                                        true)
                         }
                         message.channel.send(embed)

                    })
                    break;
          }

     }
}





