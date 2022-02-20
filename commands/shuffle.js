const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "shuffle",
  description: "Xáo trộn bài hát trong danh sách nhạc",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["shuff"],
  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.get(message.guild.id);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Không có bài hát nào đang phát ...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn cần ở chung kênh thoại với tôi để sử dụng lệnh này!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Bạn cần ở chung kênh thoại với tôi để sử dụng lệnh này!**"
      );
    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return client.sendTime(
        message.channel,
        "❌ | **Không đủ bài hát trong danh sách để sử dụng chức năng này!**"
      );
    player.queue.shuffle();
    await client.sendTime(message.channel, "✅ | Đã xáo trộn danh sách nhạc!");
  },
};
