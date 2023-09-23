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

await bot.helpers.createGuildApplicationCommand(commands.neko as discordeno.CreateSlashApplicationCommand, Secret.GUILD_ID)
await bot.helpers.upsertGuildApplicationCommands(Secret.GUILD_ID, [commands.neko as discordeno.CreateSlashApplicationCommand])

bot.events.messageCreate = (b, message) => {
    for (const command in commands) {
        if (message.content.startsWith(CommandStartChar+command)) {
            (async () => {
                await ((commands as any)[command] as any).func(b, message);
            })();
        }
    }
}

bot.events.interactionCreate = (b, interaction) => {
    // interaction.data?.name
    for (const command in commands) {
        console.log(command, interaction.data?.name)
        if ((commands as any)[command].name === interaction.data?.name) {
            (async () => {
                await ((commands as any)[command]).func(b, interaction);
            })();
        }
    }
}

await discordeno.startBot(bot)