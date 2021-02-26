module.exports = {
    // The default name of the command
    name: "pickperson",
    // The Category of the command (Used for help)
    category: "fun",
    // Description of the command for the help menu
    description: "Pick a person from a list of mentions",
    // Aliases that the command will also trigger
    aliases: [],
    // Additional values that the command would require, to be added to help
    usage: ' [mentions]',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        return message.reply(`I choose ${message.mentions.users.random()}`)
    },
};