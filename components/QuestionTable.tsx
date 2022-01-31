import { useState } from 'react';
import { IQuestionTableProp } from '../lib/types';

const QuestionTable = ({ question, logger }: IQuestionTableProp) => {
    const [search, setSearch] = useState('');
    const searchQuestion = question.filter(q => q.text.toLowerCase().includes(search.toLowerCase()))
    return (
        <>
        <form className="w-11/12 mx-auto my-2">
            <div className="flex items-center border-b border-violet-700 py-2">
            <input className="appearance-none bg-transparent border-none w-full text-slate-100 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text"
            placeholder="Filter by searching" aria-label="Search" onChange={e => setSearch(e.currentTarget.value)}/>
            </div>
        </form>
        {searchQuestion.length ?
        <table className='font-mono text-slate-100 opacity-70 table table-fixed border-collapse cursor-pointer my-4 '>
            <tbody>
                {searchQuestion.filter(q => q.text.toLowerCase().includes(search.toLowerCase())).map((q, idx) => (
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