import { discordeno } from "./deps.ts"
import { Secret } from "./secret.ts"
import { commands } from "./commands.ts";
import { sendEmoji } from "./inaka.ts";

const bot = discordeno.createBot({
    token: Secret.DISCORD_TOKEN,
    intents: discordeno.Intents.Guilds | discordeno.Intents.GuildMessages | discordeno.Intents.MessageContent,
    events: {
        ready: (_bot, payload) => {
            console.log(`${payload.user.username} is ready!`)
        },
    },
})

{
    let appCommands = [];
    for (const command in commands) {
        const appCommand = { ...(commands as any)[command], name: command } as discordeno.CreateSlashApplicationCommand;
        appCommands.push(appCommand);
        await bot.helpers.createGuildApplicationCommand(appCommand, Secret.GUILD_ID);
    }
    await bot.helpers.upsertGuildApplicationCommands(Secret.GUILD_ID, appCommands);
}

bot.events.messageCreate = (_b, message) => {
    sendEmoji(_b, message);
}

bot.events.interactionCreate = (b, interaction) => {
    for (const command in commands) {
        if (command === interaction.data?.name) {
            (async () => {
                await ((commands as any)[command]).func(b, interaction);
            })();
        }
    }
}

await discordeno.startBot(bot)