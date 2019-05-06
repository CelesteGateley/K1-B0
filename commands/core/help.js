const { prefix, debug, embedColor } = require('../../config.json');
const discord = require("discord.js");

module.exports = {
    name: "help",
    category: 1,
    description: "Lists all the commands that I can perform",
    aliases: ['commands'],
    usage: '',
    args: false,
    execute(message, args) {
        const client = message.client;
        const categories = { 1: 'Core', 2: 'Utility', 3: 'Fun', 4: 'Dungeons and Dragons'};
        const cmdCatArray = [[],[],[],[]];

        client.commands.forEach((value) => { cmdCatArray[value.category-1].push(value); });

        if (!args.length) {
            let embed = new discord.RichEmbed().setColor(embedColor);
            embed.setTitle("K1-B0 Help Command");
            embed.setDescription("Here is the help information for the K1-B0 discord bot!");
            for (let x = 0; x < 4; x++) {
                let fieldText = '';
                for (let cmd of cmdCatArray[x]) {
                    let cmdUsg = '`' + cmd.name + ' ' + cmd.usage;
                    fieldText += cmdUsg + '`\n';
                }
                embed.addField('**' + categories[x+1] + '**', fieldText);
            }
            return message.author.send(embed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    if (debug) {
                        console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    } else {
                        console.error(`Could not send help DM to ${message.author.tag}.\n`);
                    }
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = client.commands.get(name) || client.commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) { return message.reply('that\'s not a valid command!'); }

        let embed = new discord.RichEmbed().setColor(embedColor);

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);

        message.channel.send(data, { split: true });
    },
};