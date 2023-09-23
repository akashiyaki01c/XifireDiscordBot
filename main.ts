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

{
    let appCommands = [];
    for (const command in commands) {
        const appCommand = { ...commands.neko, name: command } as discordeno.CreateSlashApplicationCommand;
        appCommands.push(appCommand);
        await bot.helpers.createGuildApplicationCommand(appCommand, Secret.GUILD_ID);
    }
    await bot.helpers.upsertGuildApplicationCommands(Secret.GUILD_ID, appCommands);
}

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
        if (command === interaction.data?.name) {
            (async () => {
                await ((commands as any)[command]).func(b, interaction);
            })();
        }
    }
}

await discordeno.startBot(bot)