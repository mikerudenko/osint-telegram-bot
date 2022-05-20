
const child_process = require('child_process');
import fs from 'fs';

const exec = async (mainCommand:string, commands: string[], fileUrl: string) => new Promise((resolve) => {

    const work = child_process.spawn(mainCommand, commands);
    work.stdout.on('data', (data: string) => {
        console.log(`stdout: ${data}`);
        fs.appendFileSync(fileUrl, data);
    });

    work.stderr.on('data', (data:string) => {
        console.error(`ps stderr: ${data}`);
      });

    work.on('close', () => {
        console.log('close');
        resolve(true);
    });
})

export const getCommonWPScan = async (url:string) => {
    if(url.includes('http')) {
        throw new Error('URL must not contain http');
    }

    try {
        const sourceUrl = `./wp-scan/${url}-common-scan.txt`;
        await exec('wpscan', ['--url', url], sourceUrl);
        return {sourceUrl, error: null}
    } catch(error) {
        console.log(error)
        return {error, sourceUrl: null}
    }
}

export const getGoBusterScan = async (url:string) => {
    if(url.includes('http')) {
        throw new Error('URL must not contain http');
    }

    try {
        const sourceUrl = `./gobuster/${url}-scan.txt`;
        await exec('gobuster', ['dir', '--url', url, '--wordlist', './web-content.txt'], sourceUrl);
        return {sourceUrl, error: null}
    } catch(error) {
        console.log(error)
        return {error, sourceUrl: null}
    }
}