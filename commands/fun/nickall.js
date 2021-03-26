module.exports = {
    // The default name of the command
    name: "nickall",
    // The Category of the command (Used for help)
    category: "fun",
    // Description of the command for the help menu
    description: "",
    // Aliases that the command will also trigger
    aliases: [],
    // Additional values that the command would require, to be added to help
    usage: '',
    // If the command REQUIRES arguments, then this should be set to true
    args: false,
    // Code to be executed when the command is run
    execute(message, args) {
        if (message.guild.members.cache.get(message.author.id).permissions.has("ADMINISTRATOR") || message.author.id === "147590676391919616") {
            if (args[0] != null) {
                message.guild.members.cache.each((member) => {
                    member.setNickname(args[0]).catch(err => null);
                });
            } else {
                message.guild.members.cache.each((member) => {
                    member.setNickname().catch(err => null);
                })
            }
        }
    },
};