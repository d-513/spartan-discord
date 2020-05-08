import fs from "fs-extra";
import path from "path";
import YAML from "yaml";

const defaultConfig = {
  version: "1.0.0",
  token: "YourTokenHere",
  guild: "GuildID",
  channel: "ChannelID",
  database: {
    host: "db_host",
    port: "db_port",
    database: "database_name",
    user: "db_user",
    password: "db_password",
    table: "spartan_logs",
  },
};

async function createConfigs() {
  if (!(await fs.exists(path.join("config.yml")))) {
    await fs.writeFile(path.join("config.yml"), YAML.stringify(defaultConfig));
  }
}
createConfigs();

export async function getConfig() {
  const file = await fs.readFile(path.join("config.yml"), "utf8");
  return YAML.parse(file);
}
export async function getMessage(message, args) {
  const file = await fs.readFile(path.join("messages.yml"), "utf8");
  const parsed = YAML.parse(file);
  message = parsed[message];
  if (!args) args = [];
  args.forEach((arg, i) => {
    message = message.replace(`{${i}}`, arg);
  });
  return message;
}
export async function getMessages() {
  const file = await fs.readFile(path.join("messages.yml"), "utf8");
  const parsed = YAML.parse(file);
  return parsed;
}
