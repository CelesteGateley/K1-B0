const moment = require('moment-timezone');

module.exports = {
    name: "time",
    // The Category of the command (Used for help)
    category: "utility",
    description: "Displays the current time in a given timezone",
    aliases: ['current-time', 'ct'],
    usage: '[hours] [minutes] [seconds] or time [en/on/sa/hk/la] [24hr Time]',
    args: false,
    execute(message, args) {
        let format = 'YYYY-MMMM-DD hh:mm:ss A';
        let uk_raw = moment().tz("Europe/London");
        let ontario_raw = moment().tz("America/Toronto");
        let south_africa_raw = moment().tz("Africa/Johannesburg");
        let germany_raw = moment().tz("Europe/Berlin");
        let pacific_raw = moment().tz("America/Los_Angeles");
        let parse = false;

        if (args.length) {
            parse = isNaN(parseInt(args[0]));
        }

        if (args.length > 1 && parse) {
            let time;
            let t = args[1];
            if (!isNaN(Number(args[1]))) { t = t.length === 3 ? "0" + t.slice(0,1) + ":" + t.slice(1,4) : t.slice(0,2) + ":" + t.slice(2,4); }
            let date_en = uk_raw.format('YYYY-MM-DD') + ' ';
            let date_on = ontario_raw.format('YYYY-MM-DD') + ' ';
            let date_sa = south_africa_raw.format('YYYY-MM-DD') + ' ';
            let date_ge = germany_raw.format('YYYY-MM-DD') + ' ';
            let date_pt = pacific_raw.format('YYYY-MM-DD') + ' ';
            let eng = ""; let ont = ""; let saf = ""; let ge = ""; let pt = "";
            switch (args[0].toLowerCase()) {
                case 'en':
                    time = moment.tz(date_en + t, "Europe/London");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    ge = time.tz("Europe/Berlin").format(format);
                    pt = time.tz("America/Los_Angeles").format(format);
                    break;
                case 'on':
                    time = moment.tz(date_on + t, "America/Toronto");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    ge = time.tz("Europe/Berlin").format(format);
                    pt = time.tz("America/Los_Angeles").format(format);
                    break;
                case 'sa':
                    time = moment.tz(date_sa + t, "Africa/Johannesburg");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    ge = time.tz("Europe/Berlin").format(format);
                    pt = time.tz("America/Los_Angeles").format(format);
                    break;
                case 'ge':
                    time = moment.tz(date_ge + t, "Europe/Berlin");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    ge = time.tz("Europe/Berlin").format(format);
                    pt = time.tz("America/Los_Angeles").format(format);
                    break;
                case 'la':
                    time = moment.tz(date_pt + t, "America/Los_Angeles");
                    eng = time.tz("Europe/London").format(format);
                    ont = time.tz("America/Toronto").format(format);
                    saf = time.tz("Africa/Johannesburg").format(format);
                    ge = time.tz("Europe/Berlin").format(format);
                    pt = time.tz("America/Los_Angeles").format(format);
                    break;
                default:
                    return message.channel.send("Invalid TZ Code. Valid Codes: en, on, sa, ge, fl")
            }
            return message.channel.send("```YAML" +
                `\nTime at ${t}\n`
                + `\nEngland: ${eng}`
                + `\nOntario: ${ont}`
                + `\nSAfrica: ${saf}`
                + `\nGermany: ${ge}`
                + `\nLosAnge: ${pt}`
                + "```");
        }

        if (args.length && !parse) {
            uk_raw.add(parseInt(args[0]), 'hour');
            ontario_raw.add(parseInt(args[0]), 'hour');
            south_africa_raw.add(parseInt(args[0]), 'hour');
            germany_raw.add(parseInt(args[0]), 'hour');
            pacific_raw.add(parseInt(args[0]), 'hour');
        } if (args.length > 1 && !parse) {
            uk_raw.add(parseInt(args[1]), 'minute');
            ontario_raw.add(parseInt(args[1]), 'minute');
            south_africa_raw.add(parseInt(args[1]), 'minute');
            germany_raw.add(parseInt(args[1]), 'minute');
            pacific_raw.add(parseInt(args[0]), 'minute');
        } if (args.length > 2 && !parse) {
            uk_raw.add(parseInt(args[2]), 'second');
            ontario_raw.add(parseInt(args[2]), 'second');
            south_africa_raw.add(parseInt(args[2]), 'second');
            germany_raw.add(parseInt(args[2]), 'second');
            pacific_raw.add(parseInt(args[0]), 'second');
        }

        let uk = uk_raw.format(format);
        let ontario = ontario_raw.format(format);
        let south_africa = south_africa_raw.format(format);
        let germany = germany_raw.format(format);
        let losangeles = pacific_raw.format(format);

        let msg = "```YAML\n"
            + `England: ${uk}\n`
            + `Ontario: ${ontario}\n`
            + `SAfrica: ${south_africa}\n`
            + `Germany: ${germany}\n`
            + `LosAnge: ${losangeles}\n`
            + "```";
        return message.channel.send(msg);
    },
};