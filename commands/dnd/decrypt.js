const crypto = require("crypto");
const algo = 'aes-256-cbc';

module.exports = {
    // The default name of the command
    name: "decrypt",
    // The Category of the command (Used for help)
    category: 4,
    // Description of the command for the help menu
    description: "Allows you to decrypt a string",
    // Aliases that the command will also trigger
    aliases: [],
    // Additional values that the command would require, to be added to help
    usage: '(passcode) (string)',
    // If the command REQUIRES arguments, then this should be set to true
    args: true,
    // Code to be executed when the command is run
    execute(message, args) {
        let passcode;
        let cipher;
        if (args.length === 1) {
            let arr = args[0].split("$");
            passcode = arr[1];
            cipher = arr[2];
        } else {
            passcode = args[0];
            cipher = args[1];
        }
        let decipher = crypto.createDecipher(algo, passcode);
        let result = decipher.update(cipher, 'hex', 'utf8');
        result += decipher.final('utf8');
        return message.reply("This decripted to the following message: \n`" + result + "`");
    },
};