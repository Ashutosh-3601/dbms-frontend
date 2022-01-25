import Image from "next/image";
import { IQuestionFigure } from "../../lib/types";

const QuestionFigure = ({ init, handler }: IQuestionFigure) => {
    // console.log(init)
    return (
        <>
        <div className="md:flex md:items-center">
        <div className="my-1 mx-2 md:mb-0 md:w-1/5">
            <label htmlFor="question_figure" className="font-mono text-slate-100 text-lg">Figure</label>
        </div>
        <div className="flex flex-col md:flex-row justify-between mx-2 md:w-4/5">
            <div className="inline-flex items-center">
            <input type="file" accept="image/*" id="question_figure" name="question_figure"
            className="text-base my-2 text-slate-100 font-mono file:mr-4 file:py-2 file:px-4 file:border
            file:border-violet-700 file:text-base file:font-semibold file:rounded-full
            file:bg-slate-800 file:text-violet-600 hover:file:bg-violet-800 hover:file:text-slate-100"
            onChange={handler}/>
            </div>
        </div>
        </div>
        {init.length && (init[0] !== '' && init[0] !== null) ? (
            <div className="flex flex-row-reverse justify-center w-full relative">
            <Image alt="Question Figure" width="500px" height="300px" src={URL.createObjectURL(init[0])} />
            </div>
        ) : <></>}
        </>
    );
}

export default QuestionFigure;