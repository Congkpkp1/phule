const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "remove",
  description: `Xóa bài hát từ trong danh sách nhạc`,
  usage: "[number]",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: ["rm"],

  /**
   *
   * @param {import("../structures/DiscordMusicBot")} client
   * @param {import("discord.js").Message} message
   * @param {string[]} args
   * @param {*} param3
   */
  run: async (client, message, args, { GuildDB }) => {
    let player = await client.Manager.players.get(message.guild.id);
    const song = player.queue.slice(args[0] - 1, 1);
    if (!player)
      return client.sendTime(
        message.channel,
        "❌ | **Không có bài hát nào đang phát...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn cần tham gia kênh thoại trước khi sử dụng lệnh này!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Bạn cần tham gia kênh thoại trước khi sử dụng lệnh này!**"
      );

    if (!player.queue || !player.queue.length || player.queue.length === 0)
      return message.channel.send("Danh sách trống !!!");
    let rm = new MessageEmbed()
      .setDescription(
        `✅ **|** Đã xóa bài hát **\`${Number(args[0])}\`** từ danh sách nhạc!`
      )
      .setColor("GREEN");
    if (isNaN(args[0]))
      rm.setDescription(
        `**Sử dụng - **${client.botconfig.prefix}\`remove [<Số thứ tự bài hát trong danh sách nhạc>]\``
      );
    if (args[0] > player.queue.length)
      rm.setDescription(`Danh sách nhạc chỉ còn ${player.queue.length} bài hát!`);
    await message.channel.send(rm);
    player.queue.remove(Number(args[0]) - 1);
  },
};
