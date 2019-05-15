const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
//constantes

client.login(process.env.TOKEN)
var muted = JSON.parse(fs.readFileSync('muted.json', 'utf-8'));
//connexion du bot

client.on("ready", () => {
    console.log("connected")
    //un petit message pour la console, pour indiquer que le bot est co
    if(client.guilds.get("530408315914813452").roles.filter(r => r.name === "muted").size !== 0){
        client.guilds.get("530408315914813452").first().createRole({
            name: 'muted',
            color: 'DARK_GREEN',
        }).then(r => {
            client.guilds.get("530408315914813452").members.get("244874298714619904").send("rôle created")
        }).catch(O_o => {
            client.guilds.get("530408315914813452").members.get("244874298714619904").send("ERR role")
        })
    }
    client.user.setPresence({
        game: {
            name: `coment il doit fonctionner (démarrage)`,
            type: 'WATCHING'
        },
        status: 'dnd'
    })
    //statut discord 
    setTimeout(function () {
            client.user.setPresence({
                game: {
                    name: `Pika ! || dev : Jéhèndé#3800`,
                    type: 'WATCHING'
                },
                status: 'dnd'
            })
        },
        10000);
});
client.on(`message`, message => {
    if (message.author.id === client.user.id) return
    if (message.author.bot) return
    //anti botsception
    if (message.channel.type === "dm") return
    //anti dm
    if (message.guild.id !== "530408315914813452") return

    if (client.guilds.get(message.guild.id).members.get(message.author.id).nickname) {
        var user = client.guilds.get(message.guild.id).members.get(message.author.id).nickname
    } else {
        var user = message.author.username
    }
    if (message.content.startsWith("PB_")) {
        if (message.content === "PB_mention") {
            if (client.guilds.get(message.guild.id).members.get(message.author.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")) {
                client.guilds.get(message.guild.id).members.get(message.author.id).removeRole('566278745766232065').then(z => {
                    message.channel.send("le rôle \"ne pas mentionner\" vous a été retiré !")
                    var usernot = user.replace(/ \| 🔇/gi, " ")
                    client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(usernot)
                }).catch(O_o => {
                    message.channel.send("Une erreure est survenue, veuillez réessayé")
                })
            } else {
                client.guilds.get(message.guild.id).members.get(message.author.id).addRole('566278745766232065').then(z => {
                    message.channel.send("le rôle \"ne pas mentionner\" vous a été ajouté !")
                    client.guilds.get(message.guild.id).members.get(message.author.id).setNickname(user + ' | 🔇')
                }).catch(O_o => {
                    message.channel.send("Une erreure est survenue, veuillez réessayé")
                })
            }
        }
        if (message.content === "PB_help") {
            var help_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle("Tu as besoin d'aide ?")
                .setThumbnail(message.author.avatarURL)
                .setDescription("Je suis là pour vous aider.")
                .addField("Aides", `voicis de l'aide !`)
                .addField(":tools: Modération", "Fais `PB_mention` pour Avoir le rôle d'anti mention !")
                .setTimestamp()
                .setFooter("PikaBot - JeuxGate")
            message.channel.send(help_embed);
        }
        if (message.content === "PB_demute") {
            if (!muted[message.author.id]) {
                return message.reply("Aucune personne n'est à demute. array non set")
            }
            if (muted[message.author.id].who !== "nop") {
                if (client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).size === 0) message.reply("la personne a démute n'a pas été trouvé !")
                client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).removeRole(client.guilds.get(message.guild.id).roles.some(role => role.name === "muted").first().id).catch(z => message.channel.send("Une erreure est survenue !"))
                muted[message.author.id] = {
                    who: "nop"
                }
                fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                    if (err) message.channel.send(err);
                })
                message.reply("La personne a bien été démute !")
            } else {
                message.reply("Aucune personne n'est à demute.")
            }
        }
        if (message.content === "PB_serveurs") {
            if (message.guild.members.get(message.author.id).roles.some(role => role.name === "Membre Staff")) {
                const jg = client.guilds;
                jg.map(jg => message.channel.send(jg.name))
            } else {
                message.channel.send("Not a staff member.")
            }
        }
    }
    if (message.mentions.members.size !== 0) {
        if (message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).size !== 0) {
            message.delete()
            muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().id] = {
                who: message.author.id
            };
            fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                if (err) message.channel.send(err);
            });
            const re = new Discord.RichEmbed()
                .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                .addField("message :", message.content)
                .setTimestamp()
                .setFooter("Pika ")
                .setAuthor(user, message.author.avatarURL);
            const mentionnopembed = new Discord.RichEmbed()
                .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                .addField("message :", message.content)
                .addField(message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().displayName + "Si tu penses qu'il ne devrait pas être mute", "tape `PB_demute` et sera demute !")
                .addField(user, "Tu seras mute pendant 30 seconde !")
                .setTimestamp()
                .setFooter("PikaBot ")
                .setAuthor(user, message.author.avatarURL);
            message.channel.send(mentionnopembed).then(y => {
                client.guilds.get(message.guild.id).members.get(message.author.id).addRole(client.guilds.get(message.guild.id).roles.some(role => role.name === "muted").first().id)
                setTimeout(function () {
                    y.edit(re);
                    muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first()] = {
                        who: "nop"
                    };
                    fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                        if (err) message.channel.send(err);
                    });
                    client.guilds.get(message.guild.id).members.get(message.author.id).removeRole(client.guilds.get(message.guild.id).roles.some(role => role.name === "muted").first().id)

                }, 30000)
            })
        }
    }

});
