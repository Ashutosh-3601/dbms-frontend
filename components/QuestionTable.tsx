import { IQuestionTableProp } from '../lib/types';

const QuestionTable = ({ question, logger }: IQuestionTableProp) => {
    return (
        <>
        {question.length ?
        <table className='font-mono text-slate-100 opacity-70 table table-fixed border-collapse cursor-pointer my-4 '>
            <tbody>
                {question.map((q, idx) => (
                <tr key={q.id} data-index={q.id} onClick={logger} className={'table-row border-gray-700 text-left border-y-[0.5px]'}>
                    <td className='hidden px-1'>{idx+1}</td>
                    <td className='px-1'>{q.text.length < 100 ? q.text : q.text.slice(0, 97) + "..."}</td>
                </tr>
                ))}
            </tbody>
        </table>
     : <p className='text-center font-mono text-slate-100 opacity-70 text-lg'>No questions found</p>}
        </>
    )
}

export default QuestionTable;