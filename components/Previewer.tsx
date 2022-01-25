import { IPreviewer } from "../lib/types";

const Previewer = ({ context, curNo = 1 }: IPreviewer) => {
    return (
        <>
        <table className='font-mono table table-fixed border-collapse my-2'>
            <tbody>
                <tr className={'table-row border-gray-700 text-left border-y-[0.5px] text-clip'}>
                    <td className='px-1 border-x-[0.5px] w-1.5 text-slate-100 opacity-70'>{curNo}</td>
                    <td className='px-1 w-full text-slate-100 break-words overflow-auto whitespace-pre-wrap'>
                        {context ? context.text : 'No Questions'}
                    </td>
                    <td className='px-1 w-1.5 border-x-[0.5px] text-slate-100 opacity-70'>10M</td>
                </tr>
            </tbody>
        </table>
        </>
    )
}

export default Previewer;