const { randint } = require(appRoot + "/functions.js");

module.exports = {
    // The default name of the command
    name: "shoot",
    // The Category of the command (Used for help)
    category: "fun",
    // Description of the command for the help menu
    description: "Shoot a friend, or yourself!",
    // Aliases that the command will also trigger
    aliases: ["s", "kill"],
    // Additional values that the command would require, to be added to help
    usage: 'shoot [person]',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        let image_dodge = appRoot + `/assets/images/dodge/${randint(1, 12)}.gif`;
        let image_shot = appRoot + `/assets/images/shot/${randint(1, 10)}.gif`;
        let image_kms = appRoot + `/assets/images/suicide/${randint(1, 6)}.gif`;
        let image_geno = appRoot + `/assets/images/geno/${randint(1, 4)}.gif`;
        let user = message.mentions.users.first() || message.author;

        if (args[0] === "@everyone" || args[0] === "@here" || args[0] === "everyone") { user = "@everyone"; }

        if (message.author.id === user.id) {
            message.channel.send(`${message.author} commited suicide!`, { files: [image_kms] });
        } else if (user.id === "147590676391919616" && randint(1, 2) === 1) {
            message.channel.send(`You attempted to shoot ${user}, but they dodged your bullet! Better luck next time, ${message.author}`, { files: [image_dodge] });
        } else if (user === "@everyone" || user === "everyone") {
            message.channel.send(`${message.author} decided to commit genocide!`, {files: [image_geno]});
        } else if ((user.id === "147590676391919616") && randint(1, 3) === 1) {
            message.reply(`Haha! You thought shooting me would be that easy?? You fool!!!`, { files: [image_dodge]});
        } else if (user !== message.author && (randint(1, 20) === 5 && (user.presence.status !== 'offline' && user.presence.status !== 'idle'))) {
            message.channel.send(`You attempted to shoot ${user}, but they dodged your bullet! Better luck next time, ${message.author}`, { files: [image_dodge] });
        } else {
            message.channel.send(`${user} was shot dead by ${message.author}!`, { files: [image_shot] });
        }
    },
};