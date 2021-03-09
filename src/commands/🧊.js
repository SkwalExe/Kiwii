const { Discord } = require("../bot")

module.exports = {
    name: "🧊",
    aliases: [":ice_cube:"],
    type: "Easter egg",
    description: "Vous devenez Shoto",
    use: "⚡",

    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setColor('RED')
            .setImage("https://cdn.discordapp.com/attachments/815573547598348338/815583859751256074/BlissfulQuarterlyKakapo-size_restricted.gif")
            .setTitle(`${message.member.displayName} devient Shoto`);
        message.channel.send(embed);
        return
    }
}