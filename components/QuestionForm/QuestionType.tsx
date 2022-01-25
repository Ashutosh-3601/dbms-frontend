import { IQuestionType } from "../../lib/types";

const QuestionType = ({ init, handler }: IQuestionType) => {
    return (
    <div className="md:flex md:items-center">
        <div className="my-1 mx-2 md:mb-0 md:w-1/5">
            <p className="font-mono text-slate-100 text-lg">Question Type</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between mx-2 md:w-4/5">
            <div className="inline-flex items-center">
                <input
                    type="radio"
                    name="question_type"
                    className="accent-violet-700 scale-150 mx-1"
                    value={1}
                    onChange={handler}
                    checked={Number(init[0]) === 1}
                    required/>
                <label className="font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white">
                    Syllabus
                </label>
            </div>
            <div className="inline-flex items-center">
                <input
                    type="radio"
                    name="question_type"
                    value={2}
                    onChange={handler}
                    checked={Number(init[0]) === 2}
                    className="accent-violet-700 scale-150 mx-1"/>
                <label className="font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white">
                    Innovative
                </label>
            </div>
            <div className="inline-flex items-center">
                <input
                    type="radio"
                    name="question_type"
                    value={3}
                    onChange={handler}
                    checked={Number(init[0]) === 3}
                    className="accent-violet-700 scale-150 mx-1"/>
                <label className="font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white">
                    Case Study
                </label>
            </div>
        </div>
    </div>
    );
};

export default QuestionType;
