import { Dispatch, MouseEvent, SetStateAction } from "react";
import { IQuestionModule } from "../../lib/types";

const QuestionModule = ({ init, handler }: IQuestionModule) => {
    return (
        <div className="md:flex md:items-center my-3">
        <div className="mx-2 md:mb-0 md:w-1/5">
            <p className="font-mono text-slate-100 text-lg">Module</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between mx-2 md:w-4/5">
            <div className="inline-flex items-center">
                <input type="radio" name='question_module' value={1} checked={1 === Number(init[0])}
                className='accent-violet-700 scale-150 mx-1' onChange={handler} required/>
                <label className='font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white'>Module 1</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name='question_module' value={2} checked={2 === Number(init[0])}
                className='accent-violet-700 scale-150 mx-1' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white'>Module 2</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name='question_module' value={3} checked={3 === Number(init[0])}
                className='accent-violet-700 scale-150 mx-1' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white'>Module 3</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name='question_module' value={4} checked={4 === Number(init[0])}
                className='accent-violet-700 scale-150 mx-1' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white'>Module 4</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name='question_module' value={5} checked={5 === Number(init[0])}
                className='accent-violet-700 scale-150 mx-1' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2 hover:text-shadow-white'>Module 5</label>
            </div>
        </div>
    </div>
    );
}

export default QuestionModule;