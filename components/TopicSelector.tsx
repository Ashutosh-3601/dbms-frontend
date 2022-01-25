import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ITopicSelector, ModuleTopic } from '../lib/types';
import { colourStyles } from '../lib/SelectMenuStyles';
import { useRouter } from 'next/router';

const TopicSelector = ({ moduleSelected, selectedOptions, handler }: ITopicSelector) => {
    const [topics, setTopics] = useState<ModuleTopic[]>([])
    const router = useRouter();
    const { subject } = router.query;
    useEffect(() => {
        const topicFetcher = async() => {
            const resp = await fetch(`http://localhost:3000/api/topics?code=${subject}&mod=${moduleSelected}`).then(r => r.json());
            if('error' in resp) setTopics([]);
            else setTopics(resp.message)
        }
        if(moduleSelected !== 0) {
            topicFetcher();
        }
        return () => {
            setTopics([])
        };
    }, [subject, moduleSelected]);
    return (
        <Select<ModuleTopic, true>
            name="topics"
            isMulti
            options={selectedOptions.length < 3 ? topics: []}
            placeholder={moduleSelected ? 'Select The Topic (Max 3)' : 'Select the module number before selecting topic'}
            value={moduleSelected ? selectedOptions : []}
            className="w-full sm:ml-3 sm:mr-1 md:mx-2 mb-3"
            id='question_topic'
            instanceId='question_topic'
            // @ts-ignore
            styles={colourStyles}
            isDisabled={moduleSelected ? false : true}
            onChange={handler}
        />
    );
};

export default TopicSelector;
