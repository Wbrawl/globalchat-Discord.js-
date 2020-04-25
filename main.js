const Discord = require('discord.js');  
const client = new Discord.Client();
const fs = require("fs")

client.on("message", async message => {
if(message.comtent.startsWith("_set global")) {
const channel = message.mentions.channels.first()
if(!channel) return message.reply("Bitte gebe einen Kanal an!")
  const glois = JSON.parse(fs.readFileSync("./global.json", "utf8"));
    glois[message.guild.id] = {
      globalchat: channel.id
    };
    fs.writeFile("./global.json", JSON.stringify(glois), err => {
      if (err) console.log(err);
    });
    message.channel.send("Der Kanal wird jetzt als Global Chat benutzt");
}

  const sett = JSON.parse(fs.readFileSync("./global.json", "utf8"));
  if (!sett[message.guild.id]) {
    sett[message.guild.id] = {
      globalchat: "700263604129366086"
    };
  }
 const globis = sett[message.guild.id].globalchat;
  if(message.channel.id === globis) {
const farben = ['WHITE', 'BLACK']
  const rdm = Math.floor(Math.random() * farben.length)
    const embed = new Discord.RichEmbed();

    embed.setDescription("Description:")
    embed.setThumbnail(message.author.avatarURL) 
    embed.setColor(farben[rdm]);
    embed.setTitle("Nutzer: " + message.author.tag);
    embed.addField("Nachricht:", message.content);
    embed.setFooter("Id: " + message.author.id + "\nServer: " + message.guild);
    message.delete()
    bot.guilds.forEach(g => {
      try{
        client.channels.get(sett[g.id].globalchat).send(embed)
      } catch(e) {return;} 
    });
};
});
const config = require('./config.json');
client.login(config.token)
