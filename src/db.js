import * as config from "./config";
import Discord from "discord.js";
import mysql from "like-mysql";
import { sendMessage } from "./index";
let timestamp = new Date();

(async () => {
  const conf = await config.getConfig();
  const msgs = await config.getMessages();
  const db = mysql.createPool(conf.database);
  setInterval(async () => {
    const res = await db.select(conf.database.table, ["*"]);
    res.forEach((row) => {
      if (row.date > timestamp) {
        if (row.info.startsWith("(False Positive)")) return;
        const embed = new Discord.MessageEmbed(msgs["detection-embed"]);
        embed.setDescription(row.info);
        embed.setTimestamp(row.date);
        sendMessage(embed);
      }
    });
    timestamp = new Date();
  }, 10 * 1000);
})();
