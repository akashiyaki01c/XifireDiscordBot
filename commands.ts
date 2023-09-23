import { discordeno } from "./deps.ts";

export const commands = {
    "neko": {
        name: "neko",
        description: "にゃーんと返します",
        func: (_bot: discordeno.Bot, _interaction: discordeno.Interaction) => {
            _bot.helpers.sendInteractionResponse(_interaction.id, _interaction.token, {
                type: discordeno.InteractionResponseTypes.ChannelMessageWithSource,
                data: {
                    content: "にゃーん！！",
                },
            })

        },
    }
};