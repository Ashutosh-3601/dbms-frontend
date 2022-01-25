import { IUserName } from "../../lib/types";

const UserName = ({ init, handler }: IUserName) => {
    return (
    <div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-slate-100 opacity-70 text-sm font-bold mb-2 px-2" htmlFor="fname">
        First Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white md:mx-2" 
      id="fname" name="fname" type="text" placeholder="Ashutosh" required
      value={init.fname} onChange={handler}
      />
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-slate-100 opacity-70 text-sm font-bold mb-2 px-2" htmlFor="lname">
        Last Name
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white md:-mx-2" 
      id="lname" name="lname" type="text" placeholder="Raj"
      value={init.lname} onChange={handler}/>
    </div>
  </div>
    );
}

export default UserName;