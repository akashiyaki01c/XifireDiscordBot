import { discordeno } from "./deps.ts";

export const commands = {
    "neko": async (_bot: discordeno.Bot, _message: discordeno.Message) => {
        _bot.helpers.sendMessage(_message.channelId, {
            content: "にゃーん",
        })
    },
};