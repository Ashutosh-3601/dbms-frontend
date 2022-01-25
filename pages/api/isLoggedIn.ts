import type { NextApiRequest, NextApiResponse } from 'next'
import { LoginChecker } from '../../lib/LoginChecker';
import type { Instructor } from '../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Instructor | {error: true}>
) {
    const isLoggedIn = await LoginChecker(req);
    if('error' in isLoggedIn) return res.json({error: true});
    else res.json(isLoggedIn)
}