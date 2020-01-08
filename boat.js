const Discord = require("discord.js") 
const fs      = require("fs")
const path    = require("path")
const chalk   = require("chalk")
const events    = require('events');

console.log(chalk.bgWhite("  ") + chalk.bgRed(" ") + chalk.bgWhite("  ") + chalk.red(" Botstion 5"))
console.log(chalk.bgWhite("  ") + chalk.bgRed(" ") + chalk.bgWhite("  ") + chalk.red(" Developed by theLMGN"))
console.log(chalk.bgWhite("     ") + chalk.dim(" https://github.com/botstion/botstion"))

const config  = require("./configLoader")

var plugins = {}

class Plugin extends events.EventEmitter {
    constructor(args) {
        this.name = args.name ? args.name : "Unnamed Plugin"
        this.author = args.author ? args.author : "Anonymous"
        this.version = args.version ? args.version : "1.0.0"
        this.description = args.description ? args.description : "A plugin for Botstion 5."
        this.onload = args.onload ? args.onload : function() {}
        this.onunload = args.onunload ? args.onunload : function() {}
    }
    commands = []
    registerCommand(name,description,usage,fn) {
        this.commands.push({name,description,usage,fn})
    }
}
class Botstion {
    constructor() {}
    plugins = plugins
    client = client
    Plugin = Plugin
    isReady = false

    registerPlugin(plugin) {
        console.log("Loading plugin " + plugin.name)
        var id = Math.random().toString().replace("0.","")
        plugin.onload()
        plugins[id] = plugin
        if (this.isReady) { plugin.emit("clientReady.") }
        return id
    }
    deregisterPlugin(pluginId) {
        if (!plugins[pluginId]) { throw new Error("No plugin with ID") }
        console.log("Unloading plugin " + plugins[pluginId].name)
        plugins[pluginId].onunload()
        plugins[pluginId] = undefined
    }
    emit() {
        for (var plugin of plugins) {
            plugin.emit(...arguments)
        }
    }
}


const bot = new Botstion()

const client = new Discord.Client()

client.on("message", function(m) {
    var split = m.content.split(" ")
    var cmd = split.shift()
    if (!cmd.startsWith(config.prefix)) { return }
    cmd = cmd.replace(config.prefix,"")


    bot.emit("cmdInvoke", c,m,cmd,split)
    
    console.log(`User `)

    for (var plugin of plugins) {

    }
})

client.on("ready", function() {
    bot.emit("clientReady")
    bot.isReady = true
})


client.login(config.discordToken);

module.exports = bot
