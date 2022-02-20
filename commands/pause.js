const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
  name: "pause",
  description: "Tạm dừng phát nhạc",
  usage: "",
  permissions: {
    channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
    member: [],
  },
  aliases: [],
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
        "❌ | **Không có bài hát nào đang phát...**"
      );
    if (!message.member.voice.channel)
      return client.sendTime(
        message.channel,
        "❌ | **Bạn cần phải ở chung kênh thoại với tôi để sử dụng lệnh này!**"
      );
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return client.sendTime(
        message.channel,
        ":x: | **Bạn cần phải ở chung kênh thoại với tôi để sử dụng lệnh này!**"
      );
    if (player.paused)
      return client.sendTime(
        message.channel,
        "❌ | **Bài hát đã tạm dừng!**"
      );
    player.pause(true);
    let embed = new MessageEmbed()
      .setAuthor(`Đã dừng bài hát!`, client.botconfig.IconURL)
      .setColor(client.botconfig.EmbedColor)
      .setDescription(`Sử dụng lệnh \`${GuildDB.prefix}resume\` để tiếp tục!`);
    await message.channel.send(embed);
    await message.react("✅");
  },
};
