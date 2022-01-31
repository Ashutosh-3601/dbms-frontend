import type { NextApiRequest, NextApiResponse } from 'next'
import { QuestionCache } from '../../lib/QuestionCache';
import { TopicCache } from '../../lib/TopicCache';
import { BaseQuestion } from '../../lib/types';
type REQ_BODY = {code: string, mod: number[], topics: [string[], string[]] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<unknown>
) {
    if(req.method === 'POST') {
    const {code, mod, topics}: REQ_BODY = req.body
    //18CS53 [ 1 ] []
    const questionsAndCode = await QuestionCache(code);
    if('error' in questionsAndCode) return res.json({message: 'Unable to get questions from cache.', error: true});
    const questionsAndModule: BaseQuestion[] = [];
    const allTopics = [];
    for(let idx = 0; idx < mod.length; idx++) {
        const modno = mod[idx]
        const topicArray = topics[idx] as string[];
            if(!topicArray.length) {
                const topic = await TopicCache(code, modno);
                if('error' in topic) return res.json({message: 'Unable to get topics from cache.', error: true});
                allTopics.push(...topic)
            } else {
                allTopics.push(...topicArray)
            }
        questionsAndModule.push(...questionsAndCode.filter(ques => ques.module === modno));
    }
    const questionsAndTopics: BaseQuestion[] = [];
    for(const topic of allTopics) {
        questionsAndTopics.push(...questionsAndModule.filter(q => q.topics.some(t => t === topic)))
    }
    return res.json({message:questionsAndTopics});
    }
}