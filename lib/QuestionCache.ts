import redis from "./Redis"
import { BaseQuestion } from "./types";

export const QuestionCache = async (subcode: string): Promise<{error: true} | BaseQuestion[]> => {
    const allQuestions = await redis.zrange(`${subcode}_questions`, 0, -1);
    if(!allQuestions.length){
        const questionReq = await fetch(`http://localhost:3001/questions/${subcode}`);
        const questionRes: BaseQuestion[] = await questionReq.json();
        if(questionReq.status != 200) return {error: true}
        for(const question of questionRes) {
            await redis.zadd(`${subcode}_questions`, question.module * 1000 + question.qno, JSON.stringify(question));
        }
        allQuestions.push(...(await redis.zrange(`${subcode}_questions`, 0, -1)))
    }
    const questions = [];
    for(const q of allQuestions) {
        questions.push(JSON.parse(q))
    }
    return questions as BaseQuestion[];
}

export const getQuestionByID = async (subcode: string, id: string) => {
    const questionCache = await QuestionCache(subcode);
    if('error' in questionCache) return null;
    return questionCache.find(ques => ques.id === id);
}