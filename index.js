const bot = require('./src/bot')

const client = new bot.Discord.Client();
client.commands = new bot.Discord.Collection();

const commandFiles = bot.fs.readdirSync("./src/commands");

commandFiles.forEach(file => {
    const command = require('./src/commands/' + file)
    bot.print(`La commande ${command.name} a été chargée avec success !`)
    client.commands.set(command.name, command)

})

client.once('ready', () => {
    bot.print('Bot pret !')
})

client.on('message', message => {
    if (!message.guild) return;
    if (!message.content.toLowerCase().startsWith(bot.config.prefix)) return;
    message.content = bot.removeExtraSpacesFrom(message.content)
    message.content = message.content.replace(/\n|\r/g, '');

    var args = message.content.slice(bot.config.prefix.length).trim().split(/ +/);
    if (!args[0]) args[0] = "help"
    const commandName = args.shift();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return bot.derror(message, 'Impossible de trouver la commande que vous cherchez')
    if (command.require && !message.member.hasPermission(command.require)) return bot.derror(message, "Vous n'avez pas le droit d'utiliser cette commande");
    command.execute(message, args.join(' '))

})



client.login(bot.config.token)