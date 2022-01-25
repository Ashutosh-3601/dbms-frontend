import { IUserEmail } from "../../lib/types";

const UserEmail = ({ init, handler }: IUserEmail) => {
    return (
        <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-slate-100 opacity-70 text-sm font-bold mb-2 px-2" htmlFor="email">
            Email
          </label>
          <input className="appearance-none block w-11/12 bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:peer mx-2" 
          id="email" name="email" type="email" placeholder="you@bmsit.in" required
          value={init} onChange={handler}/>
          <p className="text-pink-500 invisible peer-invalid:visible text-xs italic mx-2">Invalid Email</p>
        </div>
      </div>
    )
}

export default UserEmail;