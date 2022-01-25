import { writeFile } from "fs/promises"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    const body = req.body.image;
    const name = Date.now().toString(36) + Math.random().toString(36).substring(2);
    await writeFile(`${process.cwd()}/images/${name}.png`, body.replace(/^data:image\/.+;base64,/, ""), 'base64');
    return res.json({location:`images/${name}.png`});
}