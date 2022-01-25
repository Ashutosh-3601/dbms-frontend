import { IUserSubject } from "../../lib/types";

const UserSubject = ({ sub, init , handler }: IUserSubject) => {
return (
    <div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-slate-100 opacity-70 text-sm font-bold mb-2 px-2" htmlFor={`sub${sub}`}>
        SUBJECT {sub}
      </label>
      <div className="relative">
      <div className="inline-flex items-center">
                <input type="radio" name={`sub${sub}`} value={'18CS51'} checked={'18CS51' === init}
                className='accent-violet-700 scale-150 mx-2' onChange={handler} 
                required={sub===1}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2'>18CS51</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name={`sub${sub}`} value={'18CS52'} checked={'18CS52' === init}
                className='accent-violet-700 scale-150 mx-2' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2'>18CS52</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name={`sub${sub}`} value={'18CS53'} checked={'18CS53' === init}
                className='accent-violet-700 scale-150 mx-2' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2'>18CS53</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name={`sub${sub}`} value={'18CS54'} checked={'18CS54' === init}
                className='accent-violet-700 scale-150 mx-2' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2'>18CS54</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name={`sub${sub}`} value={'18CS55'} checked={'18CS55' === init}
                className='accent-violet-700 scale-150 mx-2' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2'>18CS55</label>
            </div>
            <div className="inline-flex items-center">
                <input type="radio" name={`sub${sub}`} value={'18CS56'} checked={'18CS56' === init}
                className='accent-violet-700 scale-150 mx-2' onChange={handler}/>
                <label className='font-mono text-slate-100 opacity-70 mx-2'>18CS56</label>
            </div>
      </div>
    </div>
  </div>
);
}

export default UserSubject;