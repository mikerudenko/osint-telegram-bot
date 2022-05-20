import { Context, Telegraf } from 'telegraf';
import { mainKeyboard, URL_USER_POOL } from './bot-keyboards';
import { TELEGRAM_BOT_TOKEN } from './bot.constants';
import { getUserId } from './telegraf.helpers';
import { initCommands } from './app.commands';

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);


bot.start((ctx:Context) => {
    return ctx.reply("All commands", mainKeyboard);
});

// bot.use(Telegraf.log())

initCommands(bot);


bot.start((ctx) => {
    ctx.reply('Hello ' + ctx.from.first_name + '!');
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

bot.on('message', (ctx: Context) => {
    // @ts-ignore
    const url = ctx?.message?.text as string
    const userId = getUserId(ctx);
    URL_USER_POOL[userId] = url;
    ctx.reply(`Your current working url is ${url}`);
})