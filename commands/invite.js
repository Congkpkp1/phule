const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    description: "To invite me to your server",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: ["inv"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async(client, message, args, { GuildDB }) => {
        let embed = new MessageEmbed()
            .setImage('https://media3.giphy.com/media/tqfS3mgQU28ko/giphy.gif')
            .setFooter(
                `Copyright © 𝖕𝖍𝖚́ 𝖑𝖊̂#2042 | Have a nice day!`)
            .setTimestamp()
            .setAuthor(
                "Invite " + client.user.tag + " to your server!",
                client.user.displayAvatarURL()
            )
            .setColor("BLUE")
            .setDescription(
                `Bấm vào đây để mời Animal Kingdom Music [here](https://discord.com/oauth2/authorize?client_id=${
          client.botconfig.ClientID
        }&permissions=${
          client.botconfig.Permissions
        }&scope=bot%20${client.botconfig.Scopes.join("%20")}&redirect_url=${
          client.botconfig.Website
        }${client.botconfig.CallbackURL}&response_type=code)`
            );
        message.member.send(embed);
    },
};