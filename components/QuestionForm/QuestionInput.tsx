import { IQuestionInput } from "../../lib/types";

const QuestionInput = ({ init, handler }: IQuestionInput) => {
    return (
        <div className="md:flex md:items-center my-3">
        <div className="mx-2 md:mb-0 md:w-1/5">
            <label htmlFor='question' className="font-mono text-slate-100 text-lg">Question</label>
        </div>
        <textarea id='question' name='question' className='shadow appearance-none min-h-[25px] border rounded w-full px-3 py-2 sm:ml-3 sm:mr-1 md:mx-3 leading-tight focus:outline-none focus:shadow-outline placeholder:italic placeholder:px-3'
        placeholder='Enter the question (min 20 chars)' minLength={20} value={init} onChange={handler} required/>
    </div>
    );
}

export default QuestionInput;