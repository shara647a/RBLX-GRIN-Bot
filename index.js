require("dotenv").config();
const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let data = JSON.parse(fs.readFileSync("data.json"));

client.once("ready", () => {
  console.log(`🤖 Bot online: ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "feedback") {
    data.feedbackCount += 1;
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));

    const content = interaction.options.getString("noidung");

    const embed = new EmbedBuilder()
      .setAuthor({
        name: `Khách hàng ${data.feedbackCount}`,
        iconURL: interaction.user.displayAvatarURL()
      })
      .setDescription(`• ${content}`)
      .setColor(0x2ecc71)
      .addFields({
        name: "Thời gian mua hàng",
        value: new Date().toLocaleString("vi-VN")
      })
      .setFooter({
        text: "TSM Store | discord.gg/tsmstore"
      });

    await interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
