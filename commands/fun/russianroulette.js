module.exports = {
    // The default name of the command
    name: "russianroulette",
    // The Category of the command (Used for help)
    category: "",
    // Description of the command for the help menu
    description: "",
    // Aliases that the command will also trigger
    aliases: ["rr", "russian", "roulette"],
    // Additional values that the command would require, to be added to help
    usage: '',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let rr_bullet = Math.floor(Math.random() * (6 - 1) + 1)
        let rr_count = 1;
        message.channel.send("You spin the cylinder of the revolver with 1 bullet in it...");
        setTimeout(function() {
            message.channel.send("...you place the muzzle against your head and pull the trigger...");
        }, 1000);
        setTimeout(function() {
            if (rr_bullet === rr_count) {
                message.channel.send("...your brain gets splattered all over the wall.");
            } else {
                message.channel.send("...you live to see another day.");
            }
        }, 3000);
    },
};