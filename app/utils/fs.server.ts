import { readFile, readdir } from "node:fs/promises";

// Since Remix v2 __dirname is not available. Solution: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const POST_RELATIVE_DIR = '../../public';

export async function getFileFromPublic(path: string) {
  return await readFile(`${__dirname}${POST_RELATIVE_DIR}/${path}`, "utf-8");
}

export async function getDirsFromPublic(path: string = '') {
  return await readdir(`${__dirname}${POST_RELATIVE_DIR}/${path}`, { withFileTypes: true });
}
