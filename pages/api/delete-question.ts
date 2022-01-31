import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/Redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    const { question_id } = req.query;
    const deleteReq = await fetch(`http://localhost:3001/questions/${question_id}`, {
        method: 'DELETE',
    });
    if(deleteReq.status != 200) {
        res.status(200).json({error: true});
    }
    const [code, mod, qno] = question_id.toString().split('_');
    const question = await redis.zrevrangebyscore(`${code}_questions`, Number(mod) * 1000 + Number(qno), Number(mod) * 1000 + Number(qno));
    if(!question.length) {
        return res.status(200).json({error: false});
    }
    await redis.zrem(`${code}_questions`, question[0]);
    res.status(200).json({
        error: false,
    });
}