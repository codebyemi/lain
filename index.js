const dotenv = require("dotenv");
dotenv.config();
const { openai, discord } = require("./config.js");

discord.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  try {
    if (message.content.startsWith("!ask ")) {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        prompt: message.content.slice(5),
      });
      await message.reply(response.data.choices[0].text);
    }
  } catch (error) {
    console.error(error);
  }
});

discord.on("ready", (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

discord.login(process.env.DISCORD_TOKEN);
