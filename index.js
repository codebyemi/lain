const dotenv = require("dotenv");
dotenv.config();
const { openai, discord, youtube, prompts } = require("./config.js");

discord.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  const command = message.content.split(" ")[0];

  try {
    if (command === "!ask") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.99,
        max_tokens: 1524,
        top_p: 0.7,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        prompt: message.content.slice(5),
      });
      await message.reply(response.data.choices[0].text);
    }
    if (command === "!play") {
      await youtube(message);
    }
    if (command === "!help") {
      await message.reply(prompts.help);
    }
    if (command === "!code") {
      const response = await openai.createCompletion({
        model: "code-davinci-002",
        temperature: 0.9,
        max_tokens: 2000,
        top_p: 0.7,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        prompt: `${prompts.code} \n${message.content.slice(6)}`,
      });
      await message.reply(response.data.choices[0].text);
    }
    if (command === "!simulate") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        prompt: `${prompts.simulate} ${message.content.slice(10)}`,
      });
      await message.reply(response.data.choices[0].text);
    }
    if (command === "!node") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        prompt: `${prompts.node} \n${message.content.slice(6)}`,
      });
      await message.reply(response.data.choices[0].text);
    }
    if (command === "!testCreate") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        prompt: `${prompts.testCreate} \n${message.content.slice(12)}`,
      });
      await message.reply(response.data.choices[0].text);
    }
    if (command === "!debug") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.7,
        presence_penalty: 0.7,
        prompt: `${prompts.debug} \n${message.content.slice(7)}`,
      });
      await message.reply(response.data.choices[0].text);
    }
    if (command === "!dan") {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        temperature: 0.9,
        max_tokens: 524,
        top_p: 0.7,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
        prompt: `${prompts.dan} \n${message.content.slice(5)}`,
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
