import Discord from "discord.js";
import * as config from "./config";
import { version } from "../package.json";
const client = new Discord.Client();
let conf;
(async () => {
  conf = await config.getConfig();
  client.on("message", async (message) => {
    if (message.content.startsWith("!spartan")) {
      return message.channel.send(
        await config.getMessage("version-message", [version])
      );
    }
  });
  client.once("ready", () => {
    require("./db");
    console.log("Up and running");
  });
  client.login(conf.token);
})();
export async function sendMessage(msg) {
  const guild = client.guilds.cache.get(conf.guild);
  const channel = guild.channels.cache.get(conf.channel);
  return channel.send(msg);
}
