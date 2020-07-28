module.exports = {
    name: 'sarbath',
    // The Category of the command (Used for help)
    category: "fun",
    description: 'Let\'s people know you need to do your business',
    aliases: ['bathroom', 'tetgone'],
    usage: '',
    args: false,
    execute(message, args) {
        return message.reply('', {
            files: [appRoot + "/assets/images/sarbath.jpg"]
        }).catch(err => console.error(err));
    }
};