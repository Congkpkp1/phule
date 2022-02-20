const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "disconnect",
  description: "Dừng phát nhạc / kick Bot khỏi room",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["leave", "exit", "quit", "dc", "stop"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn cần ở trong 1 kênh thoại trước.**"
      );
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Đang không có bài hát nào được phát ...**"
      );
    await client.sendTime(message.channel, ":notes: | **Đã rời khỏi kênh thoại!**");
    await message.react("✅");
    player.destroy();
  },
};
