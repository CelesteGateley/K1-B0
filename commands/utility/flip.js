module.exports = {
    // The default name of the command
    name: "flip",
    // The Category of the command (Used for help)
    category: 2,
    // Description of the command for the help menu
    description: "Flip a coin!",
    // Aliases that the command will also trigger
    aliases: [ 'coin', 'toss' ],
    // Additional values that the command would require, to be added to help
    usage: '',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let toss = Math.random();
        if (toss < 0.5) {
            return message.reply('Heads!');
        } else {
            return message.reply('Tails!');
        }
    },
};