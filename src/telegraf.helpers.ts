import { Context } from "telegraf";

export const getUserId = (context: Context) => context?.from?.id as number

export const sendTextFileToUser = (path:string, context: Context)=> 
    context.telegram.sendDocument(getUserId(context), {
        source: path,
    }).catch((error) => {
         console.log(error);
    })
