import { discordeno } from "./deps.ts";
import { Emoji } from "./emoji.ts";

const inaka = [
    "東大和市",
    "東村山",
    "東灘",
    "札幌",
    "田舎",
];

export function sendEmoji(bot: discordeno.Bot, message: discordeno.Message) {
    console.log(message.content)
    if (message.content.includes("東大和市")) {
        bot.helpers.addReaction(message.channelId, message.id, Emoji.higayama_inaka)
    }
    if (inaka.some(v => message.content.includes(v))) {
        bot.helpers.addReaction(message.channelId, message.id, Emoji.inaka)
    }
}