const dotenv = require("dotenv");
dotenv.config();
const {
  openai,
  messageConfig,
  discord,
  youtube,
  prompts,
} = require("./services.js");

discord.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const command = message.content.split(" ")[0];

  switch (command) {
    case "!ask":
      const askResponse = await openai.createCompletion(
        await messageConfig(message.content.slice(5))
      );
      await message.reply(askResponse.data.choices[0].text);
      break;

    case "!youtube":
      await youtube(message.content.slice(8));
      break;

    case "!help":
      await message.reply(prompts.help);
      break;

    case "!code":
      const codeResponse = await openai.createCompletion(
        await messageConfig(
          prompts.code + message.content.slice(6),
          2000,
          "code-davinci-002"
        )
      );
      await message.reply(codeResponse.data.choices[0].text);
      break;

    case "!simulate":
      const simulateResponse = await openai.createCompletion(
        await messageConfig(prompts.simulate + message.content.slice(10))
      );
      await message.reply(simulateResponse.data.choices[0].text);
      break;

    case "!node":
      const nodeResponse = await openai.createCompletion(
        await messageConfig(
          prompts.node + message.content.slice(6),
          2000,
          "code-davinci-002"
        )
      );
      await message.reply(nodeResponse.data.choices[0].text);
      break;

    case "!testCreate":
      const testCreateResponse = await openai.createCompletion(
        await messageConfig(
          prompts.testCreate + message.content.slice(12),
          2000,
          "code-davinci-002"
        )
      );
      await message.reply(testCreateResponse.data.choices[0].text);
      break;

    case "!debug":
      const debugResponse = await openai.createCompletion(
        await messageConfig(
          prompts.debug + message.content.slice(7),
          2000,
          "code-davinci-002"
        )
      );
      await message.reply(debugResponse.data.choices[0].text);
      break;

    case "!dan":
      const danResponse = await openai.createCompletion(
        await messageConfig(
          prompts.dan + message.content.slice(5),
          2000,
          "code-davinci-002"
        )
      );
      await message.reply(danResponse.data.choices[0].text);
      break;
  }
});

discord.on("ready", (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

discord.login(process.env.DISCORD_TOKEN);
