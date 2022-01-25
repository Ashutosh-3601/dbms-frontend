import redis from "./Redis"
import { Topics } from "./types";

export const TopicCache = async (code: string, mod: number) => {
    const allTopics = await redis.lrange(`${code}_${mod}_topics`, 0, -1);
    if(!allTopics.length){
        const TopicReq = await fetch(`http://localhost:3001/questions/topics/${code}/${mod}`);
        const TopicRes: Topics[] = await TopicReq.json();
        if(TopicReq.status != 200) return {error: true}
        for(const topic of TopicRes) {
            await redis.rpush(`${code}_${mod}_topics`, topic.topic)
            await redis.expire(`${code}_${mod}_topics`, 24*60*60)        }
        allTopics.push(...(await redis.lrange(`${code}_${mod}_topics`, 0, -1)))
    }
    return allTopics;
}