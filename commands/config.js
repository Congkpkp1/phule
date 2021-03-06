const { MessageEmbed, MessageReaction } = require("discord.js");

module.exports = {
    name: "config",
    description: "Animal kingdom Music",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: ["ADMINISTRATOR"],
    },
    aliases: ["conf"],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async(client, message, args, { GuildDB }) => {
        let Config = new MessageEmbed()
            .setAuthor("Animal kingdom Music", client.botconfig.IconURL)
            .setColor(client.botconfig.EmbedColor)
            .addField("Prefix", GuildDB.prefix, true)
            .addField("DJ Role", GuildDB.DJ ? `<@&${GuildDB.DJ}>` : "Not Set", true)
            .setDescription(`
Bạn muốn settings chức năng nào?

:one: - Server Prefix
:two: - DJ Role
`);

        let ConfigMessage = await message.channel.send(Config);
        await ConfigMessage.react("1️⃣");
        await ConfigMessage.react("2️⃣");
        let emoji = await ConfigMessage.awaitReactions(
            (reaction, user) =>
            user.id === message.author.id && ["1️⃣", "2️⃣"].includes(reaction.emoji.name), { max: 1, errors: ["time"], time: 30000 }
        ).catch(() => {
            ConfigMessage.reactions.removeAll();
            client.sendTime(
                message.channel,
                "❌ | **Bạn đã mất quá nhiều thời gian để trả lời. Nếu bạn muốn chỉnh sửa cài đặt, hãy sử dụng lại lệnh lần nữa !**"
            );
            ConfigMessage.delete(Config);
        });
        let isOk = false;
        try {
            emoji = emoji.first();
        } catch {
            isOk = true;
        }
        if (isOk) return; //im idiot sry ;-;
        /**@type {MessageReaction} */
        let em = emoji;
        ConfigMessage.reactions.removeAll();
        if (em._emoji.name === "1️⃣") {
            await client.sendTime(
                message.channel,
                "Bạn muốn đổi prefix thành ?"
            );
            let prefix = await message.channel.awaitMessages(
                (msg) => msg.author.id === message.author.id, { max: 1, time: 30000, errors: ["time"] }
            );
            if (!prefix.first())
                return client.sendTime(
                    message.channel,
                    "Bạn đã mất quá nhiều thời gian để trả lời."
                );
            prefix = prefix.first();
            prefix = prefix.content;

            await client.database.guild.set(message.guild.id, {
                prefix: prefix,
                DJ: GuildDB.DJ,
            });

            client.sendTime(
                message.channel,
                `Đã đổi prefix thành \`${prefix}\``
            );
        } else {
            await client.sendTime(
                message.channel,
                "Tag role DJ để bật chức năng DJ"
            );
            let role = await message.channel.awaitMessages(
                (msg) => msg.author.id === message.author.id, { max: 1, time: 30000, errors: ["time"] }
            );
            if (!role.first())
                return client.sendTime(
                    message.channel,
                    "Bạn đã mất quá nhiều thời gian để trả lời."
                );
            role = role.first();
            if (!role.mentions.roles.first())
                return client.sendTime(
                    message.channel,
                    "Hãy tag role bạn muốn set làm DJ"
                );
            role = role.mentions.roles.first();

            await client.database.guild.set(message.guild.id, {
                prefix: GuildDB.prefix,
                DJ: role.id,
            });

            client.sendTime(
                message.channel,
                "Successfully saved DJ role as <@&" + role.id + ">"
            );
        }
    },
};