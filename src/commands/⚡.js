const { Discord } = require("../bot")

module.exports = {
    name: "⚡",
    aliases: [":zap:"],
    type: "Easter egg",
    description: "Vous devenez Zenitsu",
    use: "⚡",

    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('YELLOW')
            .setImage("https://cdn.discordapp.com/attachments/815573547598348338/815578552615174144/0e2037b27580b13d9141bc9cf0162b71.gif")
            .setTitle(`${message.member.displayName} devient Zenitsu`);
        message.channel.send(embed);
        return
    }
}