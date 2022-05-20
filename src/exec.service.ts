const util = require('util');
const exec = util.promisify(require('child_process').exec);
import { promises as fs } from 'fs';

export const getCommonWPScan = async (url:string) => {
    if(url.includes('http')) {
        throw new Error('URL must not contain http');
    }

    try {
        const { stdout } = await exec(`wpscan --url ${url}`);
        const sourceUrl = `./wp-scan/${url}-common-scan.txt`;
        await fs.writeFile(sourceUrl, stdout,  'utf8');
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
        const { stdout } = await exec(`gobuster dir --url ${url} --wordlist ./web-content.txt`);
        const sourceUrl = `./gobuster/${url}-scan.txt`;
        await fs.writeFile(sourceUrl, stdout,  'utf8');
        return {sourceUrl, error: null}
    } catch(error) {
        console.log(error)
        return {error, sourceUrl: null}
    }
}