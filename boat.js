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

const client = new Discord.Client()

client.login(config.discordToken);

class Plugin {
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

    registerPlugin(plugin) {
        console.log("Loading plugin " + plugin.name)
        var id = Math.random().toString().replace("0.","")
        plugin.onload()
        plugins[id] = plugin
        return id
    }
    deregisterPlugin(pluginId) {
        if (!plugins[pluginId]) { throw new Error("No plugin with ID") }
        console.log("Unloading plugin " + plugins[pluginId].name)
        plugins[pluginId].onunload()
        plugins[pluginId] = undefined
    }
}
module.exports = new Botstion()
