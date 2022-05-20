import { Context, Markup, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { mainKeyboard, URL_USER_POOL } from "./bot-keyboards";
import { getUserId, sendTextFileToUser } from "./telegraf.helpers";
import { getCommonWPScan, getGoBusterScan } from "./exec.service";
import { AppCommand } from "./bot.constants";


const appScanCommands = {
    [AppCommand.WPSCAN]: getCommonWPScan,
    [AppCommand.GOBUSTER]: getGoBusterScan,
}

const runAppCommandScan = async (ctx: Context, command: AppCommand) => {
    try {
        const userId = getUserId(ctx);
        const url = URL_USER_POOL[userId] as string
        const executor = appScanCommands[command];
        const {sourceUrl, error} = await executor(url)
        if(sourceUrl) {
            sendTextFileToUser(sourceUrl, ctx);
        } 

        if(error) {
            ctx.reply(`${command} error!`);
        } else {
            ctx.reply(`${command} is done!`, mainKeyboard)
        }

    } catch (error) {
        if(error instanceof Error) {
            ctx.reply(error.name, mainKeyboard)
        }
    }
}

export const initCommands = (bot: Telegraf<Context<Update>> ) => {
    bot.action(AppCommand.WPSCAN, (ctx:Context) => {
        ctx.reply('Working on wordpress scan...')
        runAppCommandScan(ctx, AppCommand.WPSCAN)
    });

    bot.action(AppCommand.GOBUSTER, (ctx:Context) => {
        ctx.reply('Working on gobuster scan...')
        runAppCommandScan(ctx, AppCommand.GOBUSTER)
    });
}