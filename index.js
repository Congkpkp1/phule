const DiscordMusicBot = require("./structures/DiscordMusicBot");
const client = new DiscordMusicBot();
client.on('ready', () => {
    console.log("")
    client.user.setActivity(`Phú Lê Entertainment`, { type: "STREAMING", url: "https://www.youtube.com/watch?v=ifIouMLei7Q&t=665s" })
});

client.build();

module.exports = client; //;-;