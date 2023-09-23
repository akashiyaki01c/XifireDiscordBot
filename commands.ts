import { discordeno } from "./deps.ts";
import { Emoji } from "./emoji.ts";

export const commands = {
    "neko": {
        description: "にゃーんと返します",
        func: (_bot: discordeno.Bot, _interaction: discordeno.Interaction) => {
            _bot.helpers.sendInteractionResponse(_interaction.id, _interaction.token, {
                type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
                data: { content: "にゃーん！！", },
            })
        },
    },
    "inaka": {
        description: "田舎と返します",
        func: (_bot: discordeno.Bot, _interaction: discordeno.Interaction) => {
            _bot.helpers.sendInteractionResponse(_interaction.id, _interaction.token, {
                type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
                data: { content: `# ${Emoji.inaka}***田舎です***${Emoji.inaka}`, },
            })
        },
    },
};