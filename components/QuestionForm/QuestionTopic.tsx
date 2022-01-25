import TopicSelector from "../TopicSelector";
import { IQuestionTopic } from "../../lib/types";

const QuestionTopic = ({ moduleSelected, init, handler }: IQuestionTopic) => {
    return (
        <div className="md:flex md:items-center my-3">
        <div className="mx-2 md:mb-0 md:w-1/5">
            <label htmlFor='question_topic' className="font-mono text-slate-100 text-lg">Topic</label>
        </div>
        <TopicSelector moduleSelected={moduleSelected} selectedOptions={init} handler={handler}/>
        </div>

    );
}

export default QuestionTopic;