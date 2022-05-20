const Telegraf = require("telegraf");

const TELEGRAM_BOT_TOKEN = "5322797288:AAHfsM1w4X8v9d7Y7sFTu9RJkMywx21vJ38";

const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start(ctx => {
    return ctx.reply("Welcome to OSINT Bot");
});


bot.startPolling();
