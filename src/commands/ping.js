

module.exports = {
    name: "ping",
    aliases: [],
    use: "ping",
    type: 'Outil',
    description: "Permet de calculer le temps de reponse entre le bot et les serveurs de discord",
    execute(message, args) {
        const bot = require('../bot')
        var embed = new bot.Discord.MessageEmbed()
            .setAuthor(`🏓 Pinging....`)
            .setColor("PURPLE")
        message.channel.send(embed).then(ML => {
            var ping = ML.createdTimestamp - message.createdTimestamp
            var embed = new bot.Discord.MessageEmbed()
                .setAuthor(`🏓 Pong ! Your ping is ${ping} ms.`)
                .setColor("PURPLE")

            ML.edit(embed)

        })
        return
    }
}