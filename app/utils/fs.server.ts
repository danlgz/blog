import { readFile } from "node:fs/promises";

// Since Remix v2 __dirname is not available. Solution: https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export async function getFile(path: string) {
  return await readFile(`${__dirname}/${path}`, "utf-8");
}
