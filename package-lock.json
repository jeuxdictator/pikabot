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
    client.user.setPresence({
        game: {
            name: `Les modifications apportées (Démarrage !)`,
            type: 'WATCHING'
        },
        status: 'dnd'
    })
    //statut discord 
    setTimeout(function () {
            client.user.setPresence({
                game: {
                    name: `Les membres de la SK_ ! || dev : Jéhèndé#3800`,
                    type: 'WATCHING'
                },
                status: 'dnd'
            })
        },
        5000)
});
client.on(`message`, message => {
    if (message.author.id === client.user.id) return
    if (message.author.bot) return
    //anti botsception
    if (message.channel.type === "dm") return
    //anti dm
    if (message.guild.id !== "474693373287071745") {
        if (!message.content.startsWith("SK_")) return
        if (message.content === " SK_help") {
            var helpo_embed = new Discord.RichEmbed()
                .setColor("18d67e")
                .setTitle("Tu as besoin d'aide ?")
                .setThumbnail(message.author.avatarURL)
                .setDescription("Je suis là pour vous aider.")
                .addField("Aides", `voicis de l'aide !`)
                .addField(":tools: Rôle", "Fais `SK_role` pour voir quel rôle SK_ est utilisé !")
                .setTimestamp()
                .setFooter("SK_Bot - JeuxGate")
            message.channel.send(helpo_embed);
        }
        if (message.content === "SK_role") {
            if (message.guild.roles.filter(r => r.name === "Membre SK_").size !== 0) {
                message.channel.send("Rôle situé à la  " + message.guild.roles.filter(r => r.name === "Membre SK_").first().position + " position (de bas en haut)")
            } else {
                message.channel.send("Aucun rôle trouvé (il doit obligatoirement s'appeller `Membre SK_`) !")
            }
        }
    } else {
        if (client.guilds.get(message.guild.id).members.get(message.author.id).nickname) {
            var user = client.guilds.get(message.guild.id).members.get(message.author.id).nickname
        } else {
            var user = message.author.username
        }
        if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).size !== 0) { // si le salon du message existe dans la team de backup et que c'est un salon textuel 
            const embed = new Discord.RichEmbed()
                .addField(user + " : ", message.content + "-")
                .setTimestamp()
                .setFooter(client.user.tag + " - Jéhèndé#3800")
                .setAuthor("-", message.author.avatarURL)
            client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === message.channel.name).map(e => e.send(embed)) // envoier le message en embed
        } else {
            client.guilds.get("563771921812946964").createChannel(message.channel.name, 'text', [{ //créer le salon
                    id: message.guild.id,
                    deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
                }]).then(z => {
                    const embed = new Discord.RichEmbed()
                        .addField(user + " : ", message.content + "-")
                        .setTimestamp()
                        .setFooter(client.user.tag + " - Jéhèndé#3800")
                        .setAuthor("-", message.author.avatarURL)
                    z.send(embed) // envoyer le message en embed
                })
                .catch(O_o => {}) // on annule toutes les erreures
        }
        if (message.content.startsWith("SK_")) {
            if (message.content === "SK_mention") {
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
            if (message.content === "SK_help") {
                var help_embed = new Discord.RichEmbed()
                    .setColor("18d67e")
                    .setTitle("Tu as besoin d'aide ?")
                    .setThumbnail(message.author.avatarURL)
                    .setDescription("Je suis là pour vous aider.")
                    .addField("Aides", `voicis de l'aide !`)
                    .addField(":tools: Modération", "Fais `SK_mention` pour Avoir le rôle d'anti mention !")
                    .setTimestamp()
                    .setFooter("SK_Bot - JeuxGate")
                message.channel.send(help_embed);
            }
            if (message.content === "SK_demute") {
                if (!muted[message.author.id]) {
                    return message.reply("Aucune personne n'est à demute. array non set")
                }
                if (muted[message.author.id].who !== "nop") {
                    if (client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).size === 0) message.reply("la personne a démute n'a pas été trouvé !")
                    client.guilds.get(message.guild.id).members.get(muted[message.author.id].who).removeRole('474885335709515785').catch(z => message.channel.send("Une erreure est survenue !"))
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
            if (message.content === "SK_serveurs") {
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
                    .setFooter("SK_Bot ")
                    .setAuthor(user, message.author.avatarURL);
                const mentionnopembed = new Discord.RichEmbed()
                    .setTitle("Vous avez tenté de mentionner quelqu'un qu'on ne doit pas mentionner !")
                    .addField("message :", message.content)
                    .addField(message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first().displayName + "Si tu penses qu'il ne devrait pas être mute", "tape `SK_demute` et sera demute !")
                    .addField(user, "Tu seras mute pendant 30 seconde !")
                    .setTimestamp()
                    .setFooter("SK_Bot ")
                    .setAuthor(user, message.author.avatarURL);
                message.channel.send(mentionnopembed).then(y => {
                    client.guilds.get(message.guild.id).members.get(message.author.id).addRole('474885335709515785')
                    setTimeout(function () {
                        y.edit(re);
                        muted[message.mentions.members.filter(z => client.guilds.get(message.guild.id).members.get(z.id).roles.some(role => role.name === "🔇Ne pas mentionner🔇")).first()] = {
                            who: "nop"
                        };
                        fs.writeFile('muted.json', JSON.stringify(muted), (err) => {
                            if (err) message.channel.send(err);
                        });
                        client.guilds.get(message.guild.id).members.get(message.author.id).removeRole('474885335709515785')

                    }, 30000)
                })
            }
        }
    }
});
client.on(`guildMemberAdd`, member => {
    if (member.guild.id !== "474693373287071745") {
        if (member.guild.roles.filter(r => r.name === "Membre SK_").size !== 0) {
            if (client.guilds.get("474693373287071745").members.get(member.id).size !== 0) {
                if (client.guilds.get("474693373287071745").members.get(member.id).roles.filter(z => z.name === "Membre SK_").size !== 0) {
                    member.addRole(member.guild.roles.filter(r => r.name === "Membre SK_").first().id)
                }
            }
        }
    }
})
client.on(`channelCreate`, channel => {
    if (channel.guild.id !== "474693373287071745") return
    if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).size === 0) {
        client.guilds.get("563771921812946964").createChannel(channel.name, 'text', [{ //créer le salon
                id: channel.guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }]).then(z => {
                const createembed = new Discord.RichEmbed()
                    .addField(channel.name + " : ", "Salon crée")
                    .setTimestamp()
                    .setFooter(client.user.tag + " - Jéhèndé#3800")
                z.send(createembed) // envoier le message en createembed
            })
            .catch(O_o => {}) // on annule toutes les erreures
    } else {
        const createembed = new Discord.RichEmbed()
            .addField(channel.name + " : ", "Salon crée")
            .setTimestamp()
            .setFooter(client.user.tag + " - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).map(e => e.send(createembed)) // envoier le message en embed
    }
});
client.on(`channelDelete`, channel => {
    if (channel.guild.id !== "474693373287071745") return
    if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).size === 0) {
        client.guilds.get("563771921812946964").createChannel(channel.name, 'text', [{ //créer le salon
                id: channel.guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }]).then(z => {
                const deleteembed = new Discord.RichEmbed()
                    .addField(channel.name + " : ", "Salon supprimé")
                    .setTimestamp()
                    .setFooter(client.user.tag + " - Jéhèndé#3800")
                z.send(deleteembed) // envoier le message en deleteembed
            })
            .catch(O_o => {}) // on annule toutes les erreures
    } else {
        const deleteembed = new Discord.RichEmbed()
            .addField(channel.name + " : ", "Salon supprimé")
            .setTimestamp()
            .setFooter(client.user.tag + " - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === channel.name).map(e => e.send(deleteembed)) // envoier le message en embed
    }
});
client.on(`channelUpdate`, function (oldChannel, newChannel) {
    if (oldChannel.guild.id !== "474693373287071745") return
    if (oldChannel.name === newChannel.name) return
    if (oldChannel.deleted) return
    if (newChannel.deleted) return
    if (client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === oldChannel.name).size === 0) {
        client.guilds.get("563771921812946964").createChannel(newChannel.name, 'text', [{ //créer le salon
                id: newChannel.guild.id,
                deny: ['MANAGE_MESSAGES', 'SEND_MESSAGES']
            }]).then(z => {
                const renameembed = new Discord.RichEmbed()
                    .addField(newChannel.name + " : ", "Salon renommé")
                    .setTimestamp()
                    .setFooter(client.user.tag + " - Jéhèndé#3800")
                z.send(renameembed) // envoier le message en deleteembed
            })
            .catch(O_o => {}) // on annule toutes les erreures
    } else {
        const renameembed = new Discord.RichEmbed()
            .addField(newChannel.name + " : ", "Salon renommé")
            .setTimestamp()
            .setFooter(client.user.tag + " - Jéhèndé#3800")
        client.guilds.get("563771921812946964").channels.filter(z => z.type === "text" && z.name === oldChannel.name).map(e => e.setName(`${newChannel.name}`).then(v => v.send(renameembed))) // envoier le message en embed
    }
});
client.on(`guildCreate`, guild => {
    guild.createRole({
        name: 'Membre SK_',
        color: 'DARK_GREEN',
    }).then(r => {
        guild.members.filter(u => client.guilds.get("474693373287071745").members.get(u.id)).filter(u => client.guilds.get("474693373287071745").members.get(u.id).roles.some(z => z.name === "Membre SK_")).map(i => i.addRole(r).catch(O_o => {}))
    }).catch(O_o => {})
})
