const moment = require('moment-timezone');

module.exports = {
    name: "time",
    description: "Displays the current time in a given timezone",
    aliases: ['current-time', 'ct'],
    usage: 'time [hours] [minutes] [seconds]',
    args: false,
    execute(message, args) {
        let uk_raw = moment().tz("Europe/London");
        let ontario_raw = moment().tz("America/Toronto");
        let south_africa_raw = moment().tz("Africa/Johannesburg");

        if (args.length) {
            uk_raw.add(parseInt(args[0]), 'hour');
            ontario_raw.add(parseInt(args[0]), 'hour');
            south_africa_raw.add(parseInt(args[0]), 'hour');
        } if (args.length > 1) {
            uk_raw.add(parseInt(args[1]), 'minute');
            ontario_raw.add(parseInt(args[1]), 'minute');
            south_africa_raw.add(parseInt(args[1]), 'minute');
        } if (args.length > 2) {
            uk_raw.add(parseInt(args[2]), 'second');
            ontario_raw.add(parseInt(args[2]), 'second');
            south_africa_raw.add(parseInt(args[2]), 'second');
        }

        let uk = uk_raw.format("lll");
        let ontario = ontario_raw.format("lll");
        let south_africa = south_africa_raw.format("lll");

        let msg = "```YAML\n"
            + `England: ${uk}\n`
            + `Ontario: ${ontario}\n`
            + `Africa: ${south_africa}\n`
            + "```";
        return message.channel.send(msg);
    },
};