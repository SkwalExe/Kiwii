module.exports = {
    fs: require('fs'),
    Discord: require('discord.js'),
    config: require('./config.json'),
    print(text) {
        console.log("\33[92m[ INFORMATION ] : \33[93m" + text);
    },
    derror(message, error) {

        var embed = new this.Discord.MessageEmbed()
            //.setTitle("⛔ Error")
            .setColor('RED')
            .setDescription(error)
        message.reply(embed)
        return;

    },
    embed(message, text) {

        var embed = new this.Discord.MessageEmbed()
            .setDescription(text)
            .setColor('PURPLE')
        return message.channel.send(embed);
    },
    GetRandomInt(min, max) {

        min = Math.ceil(min);
        max = Math.floor(max);
        RandomInt = Math.floor(Math.random() * (max - min + 1)) + min;
        return RandomInt;
    },
    removeExtraSpacesFrom(string) {
        var final = ""
        for (var i = 0; i < string.length; i++) {
            if (!(final == "" && string[i] == " ") && !(string[i] === " " && string[i + 1] === " ")) {
                final += string[i];
            }
        }
        return final
    },
    isSkwal(message) {
        return message.author.id == "672823761723981889" 
    },
    getRandomItemInArray(array) {
        Array.prototype.random = function () {
            return this[Math.floor((Math.random() * this.length))];
        }
        return array.random()
    },
    Discord: require('discord.js'),
}