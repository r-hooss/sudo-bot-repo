const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config");
const helps = require("./helps");

var bot_notice = "오늘의 공지는 아직 올라오지 않았습니다";
var ban = [];

client.on("ready", () => {
  console.log(`${client.user.tag} online`);
});

client.on("guildMemberAdd", (member) => {
  if (member.user.id.includes(ban))
    client.channels.cache.get("WELCOME CHANNEL ID").send(`WELCOME TEXT`);
});

client.on("message", (msg) => {
  if (!msg.content.startsWith(config.prefix)) return;

  const cmd = msg.content.replace("$ ", "");

  if (cmd === "ping") {
    // ping command
    const e = new Discord.MessageEmbed()
      .setTitle("PING")
      .setDescription(`127.0.0.1 | ${client.ws.ping}ms`)
      .setColor("45b8ff")
      .setTimestamp();
    msg.channel.send(e);
  } else if (cmd === "help") {
    // help command
    const e = new Discord.MessageEmbed()
      .setTitle("HELP")
      .setDescription(helps.help)
      .setColor("45b8ff")
      .setTimestamp()
      .setFooter("powered by hooss");
    msg.channel.send(e);
  } else if (cmd === "notice") {
    // check notice command
    const e = new Discord.MessageEmbed()
      .setTitle("TODAY NOTICE")
      .setDescription(`\`\`\`${bot_notice}\`\`\``)
      .setColor("45b8ff")
      .setTimestamp();
    msg.channel.send(e);
  }

  // sudo (admin commands)
  if (
    (cmd.startsWith("sudo") || cmd.startsWith("su")) &&
    msg.author.id.includes(["ADMIN ID"])
  ) {
    var N = msg.content.replace("$ sudo ", "");
    const sudo_cmd = N.replace("$ su ", "");

    if (sudo_cmd.startsWith("notice")) {
      //set notice command
      if (sudo_cmd.length <= 7) {
        msg.react("⛔");
      }
      const e = new Discord.MessageEmbed()
        .setTitle("NOTICE")
        .setDescription(
          `\`\`\`${sudo_cmd
            .slice(7, sudo_cmd.length)
            .replace(/\\n/g, "\n")}\`\`\``
        )
        .setColor("45b8ff")
        .setTimestamp();
      client.channels.cache.get("NOTICE CHANNEL ID").send(e);
    }

    if (sudo_cmd.startsWith("ban ")) {
      ban.push(sudo_cmd.slice(4, sudo_cmd.length));
      // if (){}
    }
  }
});

client.login(config.token);
