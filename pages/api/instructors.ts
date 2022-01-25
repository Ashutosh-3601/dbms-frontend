// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/Redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    if(req.method === 'POST') {
        const e = await redis.sismember('instructors_email', req.body.EMAIL);
        if(e) return res.status(400).json({message: 'Email already exists! You may try modifying user'});
        const createResp = await fetch('http://localhost:3001/instructors', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(req.body)
        });
        await redis.del('instructors_email');
        const AllInstructors = await fetch('http://localhost:3001/instructors').then(r => r.json());
        for(const instructor of AllInstructors) {
            // @ts-ignore
            await redis.sadd('instructors_email', instructor.email)
        }
        if(createResp.status !== 201) {
            return res.status(createResp.status).json(await createResp.json())
        }
        return res.status(201).json({message: "Added"});
    }
}
