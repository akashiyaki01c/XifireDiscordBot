import { discordeno } from "./deps.ts"
import { Secret } from "./secret.ts"

const Intents = discordeno.Intents;

const bot = discordeno.createBot({
    token: Secret.DISCORD_TOKEN,
    intents: Intents.Guilds | Intents.GuildMessages | Intents.MessageContent,
    events: {
        ready: (_bot, payload) => {
            console.log(`${payload.user.username} is ready!`)
        },
    },
})

bot.events.messageCreate = (b, message) => {
    if (message.content === "!neko") {
        b.helpers.sendMessage(message.channelId, {
            content: "にゃーん",
        })
    }
}

await discordeno.startBot(bot)