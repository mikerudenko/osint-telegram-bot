import { Markup } from "telegraf";
import { AppCommand } from "./bot.constants";

export const mainKeyboard = Markup.inlineKeyboard([
    Markup.button.callback('WPScan', AppCommand.WPSCAN),
    // Markup.button.callback('XSS Scan', 'xss'),
    // Markup.button.callback('SQL Map', 'sqlmap'),
    Markup.button.callback('Gobuster scan', AppCommand.GOBUSTER),
])

export const URL_USER_POOL:any = {}
