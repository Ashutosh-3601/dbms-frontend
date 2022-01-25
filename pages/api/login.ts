import { randomUUID } from 'crypto';
import type { NextApiRequest, NextApiResponse } from 'next'
import { CompareHash } from '../../lib/HashGen';
import redis from '../../lib/Redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    if(req.method === 'POST') {
        res.setHeader("Set-Cookie", "sessionID=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT");
        const loginResp = await fetch('http://localhost:3001/instructors/login', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req.body)
        });
        if(loginResp.status != 201) {
            return res.status(loginResp.status).json(await loginResp.json());
        }
        const response = await loginResp.json();
        if(!CompareHash(req.body.PASSWORD, response.password)) {
            return res.status(401).json({message: 'Invalid Password'});
        }
        const sessionID = randomUUID();
        response.isAdmin = process.env.ROOT_EMAIL == response.email;
        res.setHeader("Set-Cookie", `sessionID=${sessionID}; Path=/; Max-Age=${60*60}`);
        await redis.set(sessionID, JSON.stringify(response), 'EX', 60*60);
        return res.status(200).json({message: 'ok'});
    }
}