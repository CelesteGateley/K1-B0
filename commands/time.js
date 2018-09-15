const moment = require('moment-timezone');

module.exports = {
    name: "time",
    description: "Displays the current time in a given timezone",
    aliases: ['current-time', 'ct'],
    usage: '[hours] [minutes] [seconds] or time [en/on/sa] [24hr Time]',
    args: false,
    execute(message, args) {
        let uk_raw = moment().tz("Europe/London");
        let ontario_raw = moment().tz("America/Toronto");
        let south_africa_raw = moment().tz("Africa/Johannesburg");
        let parse = false;

        if (args.length) {
            parse = isNaN(parseInt(args[0]));
        }

        if (args.length > 1 && parse) {
            let time = moment(args[1], 'HH:mm');
            let eng = "";
            let ont = "";
            let saf = "";
            switch (args[0].toLowerCase()) {
                case 'en':
                    eng = time.format("lll");
                    ont = time.tz("America/Toronto").format("lll");
                    saf = time.tz("Africa/Johannesburg").format("lll");
                    break;
                case 'on':
                    eng = time.tz("Europe/London").format("lll");
                    ont = time.format("lll");
                    saf = time.tz("Africa/Johannesburg").format("lll");
                    break;
                case 'sa':
                    eng = time.tz("Europe/London").format("lll");
                    ont = time.tz("America/Toronto").format("lll");
                    saf = time.format("lll");
                    break;
                default:
                    return message.channel.send("Invalid TZ Code. Valid Codes: en, on, sa")
            }
            return message.channel.send("```YAML" +
                `\nTime at ${args[1]}`
                + `\nEngland: ${eng}\n`
                + `\nOntario: ${ont}\n`
                + `\nAfrica: ${saf}\n`
                + "```");
        }

        if (args.length && !parse) {
            uk_raw.add(parseInt(args[0]), 'hour');
            ontario_raw.add(parseInt(args[0]), 'hour');
            south_africa_raw.add(parseInt(args[0]), 'hour');
        } if (args.length > 1 && !parse) {
            uk_raw.add(parseInt(args[1]), 'minute');
            ontario_raw.add(parseInt(args[1]), 'minute');
            south_africa_raw.add(parseInt(args[1]), 'minute');
        } if (args.length > 2 && !parse) {
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