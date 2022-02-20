const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Xem hướng dẫn của Animal kingdom Music",
    usage: "[command]",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["command", "commands", "cmd"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async(client, message, args, { GuildDB }) => {
        let Commands = client.commands.map(
            (cmd) =>
            `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
          cmd.name
        }${cmd.usage ? " " + cmd.usage : ""}\` - ${cmd.description}`
        );

        let Embed = new MessageEmbed()
            .setAuthor(
                `Commands of ${client.user.username}`,
                client.botconfig.IconURL
            )
            .setColor(client.botconfig.EmbedColor)
            .setFooter(
                `Copyright © 𝖕𝖍𝖚́ 𝖑𝖊̂#2042 | Have a nice day!`
            ).setDescription(`${Commands.join("\n")}
  
  Anaimal Kingdom Music v0.1
  [✨ Support Server](${
    client.botconfig.SupportServer
  }) | [Invite me!](https://discord.com/api/oauth2/authorize?client_id=760386446821163039&permissions=0&scope=bot) | [Dashboard](${client.botconfig.Website}) ✨`);
        if (!args[0]) message.channel.send(Embed);
        else {
            let cmd =
                client.commands.get(args[0]) ||
                client.commands.find((x) => x.aliases && x.aliases.includes(args[0]));
            if (!cmd)
                return client.sendTime(
                    message.channel,
                    `❌ | Unable to find that command.`
                );

            let embed = new MessageEmbed()
                .setAuthor(`Command: ${cmd.name}`, client.botconfig.IconURL)
                .setDescription(cmd.description)
                .setColor("GREEN")
                //.addField("Name", cmd.name, true)
                .addField("Aliases", `\`${cmd.aliases.join(", ")}\``, true)
                .addField(
                    "Usage",
                    `\`${GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix}${
            cmd.name
          }${cmd.usage ? " " + cmd.usage : ""}\``,
                    true
                )
                .addField(
                    "Permissions",
                    "Member: " +
                    cmd.permissions.member.join(", ") +
                    "\nBot: " +
                    cmd.permissions.channel.join(", "),
                    true
                )
                .setFooter(
                    `Prefix - ${
            GuildDB ? GuildDB.prefix : client.botconfig.DefaultPrefix
          }`
                );

            message.channel.send(embed);
        }
    },
};