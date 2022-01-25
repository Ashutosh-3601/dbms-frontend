import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../lib/Redis';
import { TopicLabelGen } from '../../lib/TopicLabelGen';
import { Topics } from '../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    const { code, mod } = req.query;
    const modTopics = await redis.lrange(`${code}_${mod}_topics`, 0, -1);
    if(!modTopics.length) {
        const topicReq = await fetch(`http://localhost:3001/questions/topics/${code}/${mod}`);
        const topicRes: Topics[] = await topicReq.json();
        if(topicReq.status != 200) return {error: true}
        for(const topic of topicRes) {
            await redis.rpush(`${code}_${mod}_topics`, topic.topic)
            await redis.expire(`${code}_${mod}_topics`, 24*60*60)
        }
        modTopics.push(...(await redis.lrange(`${code}_${mod}_topics`, 0, -1)))
    }
    const topics = TopicLabelGen(modTopics)
    return res.json({message: topics})
}