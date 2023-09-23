import { discordeno } from "./deps.ts"
import { Secret } from "./secret.ts"
import { commands } from "./commands.ts";

const Intents = discordeno.Intents;
const CommandStartChar = "!!";

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
    for (const command in commands) {
        if (message.content.startsWith(CommandStartChar+command)) {
            (async () => {
                await ((commands as any)[command] as any)(b, message);
            })();
        }
    }
}

await discordeno.startBot(bot)