module.exports = {
    Admins: ["464227964108931083", "UserID"], //Admins of the bot
    ExpressServer: true, //If you wanted to make the website run or not
    DefaultPrefix: process.env.Prefix || "-", //Default prefix, Server Admins can change the prefix
    Port: 3000, //Which port website gonna be hosted
    SupportServer: "https://discord.gg/TRkM28XNK8", //Support Server Link
    Token: process.env.Token || "NzYwMzg2NDQ2ODIxMTYzMDM5.X3LTEA.k5510R84Qt4SqxPOJBVQ0vvZZRc", //Discord Bot Token
    ClientID: process.env.Discord_ClientID || "760386446821163039", //Discord Client ID
    ClientSecret: process.env.Discord_ClientSecret || "EpmvdKF_Vluz4Bn_fayV3On9QsDPHE6p", //Discord Client Secret
    Scopes: ["identify", "guilds", "applications.commands"], //Discord OAuth2 Scopes
    ServerDeafen: true, //If you want bot to stay deafened
    DefaultVolume: 100, //Sets the default volume of the bot, You can change this number anywhere from 1 to 100
    CallbackURL: "/api/callback", //Discord OAuth2 Callback URL
    "24/7": true, //If you want the bot to be stay in the vc 24/7
    CookieSecret: "Pikachu is cute", //A Secret like a password
    IconURL: "https://raw.githubusercontent.com/SudhanPlayz/Discord-MusicBot/master/assets/logo.gif", //URL of all embed author icons | Dont edit unless you dont need that Music CD Spining
    EmbedColor: "RANDOM", //Color of most embeds | Dont edit unless you want a specific color instead of a random one each time
    Permissions: 2205281600, //Bot Inviting Permissions
    Website: process.env.Website || "https://sedboimusic.khabanh99991.repl.co/", //Website where it was hosted at includes http or https || Use "0.0.0.0" if you using Heroku


    //Lavalink
    Lavalink: {
        id: "Main",
        host: "lavalink-replit.rainandrewandre.repl.co",
        port: 443, // The port that lavalink is listening to. This must be a number!
        pass: "maybeiwasboring",
        secure: true, // Set this to true if the lavalink uses SSL or you're hosting lavalink on repl.it
    },

    //Please go to https://developer.spotify.com/dashboard/
    Spotify: {
        ClientID: process.env.Spotify_ClientID || "d37a48b073aa4011b9b231bca12b7193", //Spotify Client ID
        ClientSecret: process.env.Spotify_ClientSecret || "b3383de58bfa4f7c8a3d8b692e7077d9", //Spotify Client Secret
    },
}