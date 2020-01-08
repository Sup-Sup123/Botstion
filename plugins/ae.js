const bot = require("../boat")
bot.registerPlugin(new bot.Plugin({
    name: "ae",
    author: "Your Mother",
    version: "v6.9",
    description: "æ",
    onload: function() {
        console.log(bot)
    },
    onunload: function() {
        console.log("fuk u")
    }
}))