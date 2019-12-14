module.exports = {

    randint: function randint(low, high) {
        return Math.floor(Math.random() * (high - low) + low);
    },

    measureText: function(font, text) {
        let x = 0;
        for (let i = 0; i < text.length; i++) {
            if (font.chars[text[i]]) {
                x += font.chars[text[i]].xoffset +
                    (font.kernings[text[i]] && font.kernings[text[i]][text[i + 1]] ? font.kernings[text[i]][text[i + 1]] : 0) +
                    (font.chars[text[i]].xadvance || 0);
            }
        }
        return x;
    },

    align: function(start, end, text, font) {
        let dist = end - start;
        let width = measureText(font, text);
        let start_pos = start + ((dist - width) / 2);
        return parseInt(start_pos);
    },

    strshuffle: function(string) {
        let newStr = '';
        let rand;
        let i = string.length;
        while (i) {
            rand = Math.floor(Math.random() * i)
            newStr += string.charAt(rand)
            str = string.substring(0, rand) + str.substr(rand + 1)
            i--
        }
        return newStr
    }

};