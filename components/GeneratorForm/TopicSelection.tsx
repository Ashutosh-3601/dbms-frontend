import { useEffect, useState } from 'react';
import Select from 'react-select';
import { colourStyles } from '../../lib/SelectMenuStyles';
import { TopicLabelGen } from '../../lib/TopicLabelGen';
import { IGenTopicSelector, ModuleTopic } from "../../lib/types";

const TopicSelection = ({mod, sub, selectedTopics, handler}: IGenTopicSelector) => {
    const [topics, setTopics] = useState<ModuleTopic[]>([]);
    useEffect(() => {
        const fetchTopics = async(m = mod, subcode = sub) => {
            const topicReq = await fetch(`http://localhost:3000/api/topics?code=${subcode}&mod=${m}`).then(res => res.json());
            if('error' in topicReq) setTopics([]);
            setTopics(topicReq.message as ModuleTopic[]);
        }
        fetchTopics();
        return () => {
            setTopics([]);
        }
    }, [mod, sub])
    return (
        <div className={"md:flex md:items-center my-3"}>
        <div className="mx-2 md:mb-0 md:w-1/5">
            <label htmlFor='topic_selection' className="font-mono text-slate-100 text-lg">{`Select Topic From Module ${mod}`}</label>
        </div>
        <Select<ModuleTopic, true>
            name="topics"
            isMulti
            options={topics}
            placeholder={'Select The Topics to be included. Leave this blank for selecting all topics'}
            value={TopicLabelGen(selectedTopics)}
            className="w-full sm:ml-3 sm:mr-1 md:mx-2 mb-3"
            id='question_topic'
            instanceId='question_topic'
            // @ts-ignore
            styles={colourStyles}
            onChange={handler}/>
        </div>
    );
}

export default TopicSelection;