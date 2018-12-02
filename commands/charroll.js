module.exports = {
    // The default name of the command
    name: "charroll",
    // Description of the command for the help menu
    description: "Rolls for Character Stats",
    // Aliases that the command will also trigger
    aliases: [ 'cr' ],
    // Additional values that the command would require, to be added to help
    usage: '[number of stats]',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let count = 0;
        if (args.length > 0) {
            count = args[0];
        } else {
            count = 6;
        }
        let totals = [];

        for (let x = 0; x < count; x++) {
            let values = [];
            for (let y = 0; y < 4; y++) {
                let roll = Math.floor(Math.random() * 6)+1;
                values.push(roll);
            }
            values.sort();
            let sum = 0;
            for (let index = 1; index < values.length; index++) {
                sum += values[index];
            }
            totals.push(sum);
        }

        let msg = "Character Stats: ";
        for (let x = 0; x < totals.length; x++) {
            if (x === totals.length-1) {
                msg += totals[x];
            } else {
                msg += totals[x] + ", ";
            }
        }
        message.reply(msg);
    },
};