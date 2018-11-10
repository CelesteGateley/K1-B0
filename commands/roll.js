module.exports = {
    // The default name of the command
    name: "roll",
    // Description of the command for the help menu
    description: "Roll a set number of dice",
    // Aliases that the command will also trigger
    aliases: ['r'],
    // Additional values that the command would require, to be added to help
    usage: '[dice]',
    // If the command REQUIRES arguments, then this should be set to true
    args: true,
    // Code to be executed when the command is run
    execute(message, args) {
        let argString = args.join("");
        let values = argString.split("+");

        let valLine = "**Result:** ";
        let total = 0;

        for (let x = 0; x < values.length; x++) {

            let parsedVal = Number(values[x]);

            if (isNaN(parsedVal)) {
                try {
                    let count = values[x].split("d")[0];
                    let sides = values[x].split("d")[1];
                    if (sides === undefined || count === undefined || isNaN(Number(count)) || isNaN(Number(sides))) { throw "";}
                    valLine += values[x] + " (";
                    for (let counter = 0; counter < count; counter++) {
                        let roll = Math.floor(Math.random() * sides)+1;
                        valLine += roll;
                        if (counter < count-1) { valLine += ", "; }
                        total += roll;
                    }
                    valLine += ")"
                } catch (err) {
                    return message.reply("\nThere was an error processing your command with args \"**"+args.join(" ")+"**\"." +
                        " \nPlease check the values and try again! Please note that subtraction has not been implemented!")
                }
            } else {
                total += parsedVal;
                valLine += parsedVal;
            }

            if (x < values.length - 1) {
                valLine += " + ";
            }
        }

        let msg = ":game_die:\n" + valLine + "\n**Total:** " + total;
        return message.reply(msg);

    },
};