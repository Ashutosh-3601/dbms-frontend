import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/Redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    const { code } = req.query;
    await redis.del(`${code}_questions`);
    return res.json({message: 'CLeared'});
}