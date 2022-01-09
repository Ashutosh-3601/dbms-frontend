import { IQuestion } from '../pages/subjects/[id]';
import { MouseEvent, useState } from 'react';
interface IquestionProp {
    question: IQuestion[],
    logger: (e: MouseEvent<HTMLTableRowElement>) => any;
}
const QuestionTable = ({ question, logger }: IquestionProp) => {
    const [openQuestion, setOpenQue] = useState<boolean>(false)

    return (
        <>
        <table className='font-mono text-slate-100 opacity-70 table table-fixed border-collapse cursor-pointer my-4 '>
            <tbody>
                {question.map((q, idx) => (
                <tr key={q.id} data-index={q.id} onClick={logger} className={'table-row border-gray-700 text-left border-y-[0.5px]'}>
                    <td className='hidden px-1'>{idx+1}</td>
                    <td className='px-1'>{q.question.length < 100 ? q.question : q.question.slice(0, 97) + "..."}</td>
                </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}

export default QuestionTable;