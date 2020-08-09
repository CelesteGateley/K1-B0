module.exports = {
    name: 'moira',
    // The Category of the command (Used for help)
    category: "fun",
    description: 'The game do be like that',
    aliases: ['winnable',],
    usage: '',
    args: false,
    execute(message, args) {
        return message.reply('', {
            files: [appRoot + "/assets/images/winnable.jpg"]
        }).catch(err => console.error(err));
    }
};