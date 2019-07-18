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
            file: 'https://cdn.discordapp.com/attachments/263015254064103424/359043149542326272/Tet_bahtroom_jke.png'
        });
    }
};