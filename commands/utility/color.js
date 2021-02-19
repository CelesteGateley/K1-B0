module.exports = {
    // The default name of the command
    name: "color",
    // The Category of the command (Used for help)
    category: "utility",
    // Description of the command for the help menu
    description: "Set your color",
    // Aliases that the command will also trigger
    aliases: [],
    // Additional values that the command would require, to be added to help
    usage: '(color) [user]',
    // If the command REQUIRES arguments, then this should be set to true
    args: true,
    // Code to be executed when the command is run
    execute(message, args) {
        if (args[0] === "setup") {
            if (message.guild.members.cache.get(message.author.id).permissions.has("ADMINISTRATOR")) {
                message.guild.roles.create({
                    data: {name: 'ColorSetup',},
                    reason: 'Allows the bot to setup colors. Remove to disable colors',
                })
                    .then(role => {
                        message.guild.members.cache.get(message.client.user.id).roles.add(role.id);
                    });
            }
            return message.reply("Colors have been setup");
        }
        if (args[0] === "cleanup") {
            if (message.guild.members.cache.get(message.author.id).permissions.has("ADMINISTRATOR")) {
                message.guild.roles.fetch().then(roles => {
                    roles.cache.each(role => {
                        if (role.name.includes("Color")) {
                            role.delete();
                        }
                    });
                });
                return message.reply("All color roles have been removed");
            }
        }
        if (!message.guild.members.cache.get(message.client.user.id).roles.cache.some(r=>["ColorSetup"].includes(r.name))) {
            return message.reply("Color is not yet setup!")
        }
        if (!args[0].match(/^#([0-9a-f]{6})$/i)) return message.reply("That is an invalid color");
        message.guild.roles.create({
            data: {name: 'Color'+args[0], color: args[0]},
            reason: 'Added a color role',
        })
            .then(role => {
                message.member.roles.add(role.id);
            });
        return message.reply("Your color has been setup!")
    },
};