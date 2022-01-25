import { IUserPassword } from "../../lib/types";

const UserPassword = ({ init, handler }: IUserPassword) => {
    return (
        <div className="flex flex-wrap -mx-3 mb-4">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-slate-100 opacity-70 text-sm font-bold mb-2 px-2" htmlFor="password">
        Password
      </label>
      <input className="appearance-none block w-11/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white mx-2" 
      id="password" name="password" type="password" placeholder="**********" required
      value={init} onChange={handler}/>
    </div>
  </div>
    );
}

export default UserPassword;