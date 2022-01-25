import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/Redis';
import type { Instructor } from '../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Instructor | {error: true}>
) {
    // we will definitely having sessionID once we are logged in so idts there is need to check if exists
    const cookieArray = req.headers.cookie?.split("=") as string[];
    const sessionID = cookieArray[cookieArray.indexOf('sessionID')+1]
    await redis.del(sessionID)
    res.setHeader('Set-Cookie', `sessionID=${sessionID}; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`)
    res.redirect('/');
}