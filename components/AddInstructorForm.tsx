import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { MdSave } from "react-icons/md";
import { toast } from "react-toastify";
import { HashGen } from "../lib/HashGen";
import redis from "../lib/Redis";
import { CreateInstructorDto } from "../lib/TransformUser";
import UserEmail from "./UserForm/UserEmail";
import UserName from "./UserForm/UserName";
import UserPassword from "./UserForm/UserPassword";
import UserSubject from "./UserForm/UserSubject";
export const InitialUserFormState = {
  'fname': '',
  'lname': '',
  'email': '',
  'password': '',
  'sub1': '',
  'sub2': null
}

const AddInstructorForm = () => {
  const [formFields, setFormFields] = useState<typeof InitialUserFormState>(InitialUserFormState);
  const handleFormInput = (event: MouseEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const createUser = async (event: FormEvent<HTMLElement> ) => {
    event.preventDefault();
    formFields.password = HashGen(formFields.password);
    const fieldData = new CreateInstructorDto(formFields);
      const resp = await fetch('http://localhost:3000/api/instructors', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fieldData)
      });
      if(resp.status != 201) toast.error((await resp.json()).message, { theme: 'dark'})
      else toast.success("Added the User", { theme : 'dark'})
      setFormFields(InitialUserFormState);
      // @ts-ignore
    event.target.reset();
  }
  
    return (
<form className="w-full max-w-lg my-3" autoComplete="off" onSubmit={createUser}>
  <UserName init={{ fname: formFields.fname, lname: formFields.lname }} handler={handleFormInput}/>
  <UserEmail init={formFields.email} handler={handleFormInput}/>
  <UserPassword init={formFields.password} handler={handleFormInput}/>
  <UserSubject sub={1} init={formFields.sub1} handler={handleFormInput}/>
  {formFields.sub1.length ? (
    <UserSubject sub={2} init={formFields.sub2} handler={handleFormInput}/>
  ) : <></>}
  <div className="flex items-center justify-end">
    <button className="font-mono bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold py-2 px-4 mx-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline" type="submit">
    <div className="flex justify-start">
    <MdSave size={21} />
        <span className="mx-2">Save</span>
    </div>
    </button>
    </div>
</form>
    );
}


export default AddInstructorForm;