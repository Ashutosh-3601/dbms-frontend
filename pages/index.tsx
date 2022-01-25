import type { NextPage } from 'next';
import { MdAlternateEmail } from 'react-icons/md';
import { FaKeyboard, FaLock } from 'react-icons/fa';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
    const router = useRouter();
    const InitialFormInput = {
        email: '',
        password: ''
    }
    useEffect(() => {
        const fetchLoginStatus = async () => {
        const resp = await fetch(`http://localhost:3000/api/isLoggedIn`).then(r => r.json());
        if(!('error' in resp)) router.push('/dashboard')
        }
        fetchLoginStatus();
    })
    const [formInput, setFormInput] = useState<typeof InitialFormInput>(InitialFormInput)
    const handleFormInput = (event: ChangeEvent<HTMLInputElement>) => {
        setFormInput({...formInput,
        [event.currentTarget.name]: event.currentTarget.value})
    }
    const Login = async (event: FormEvent<HTMLElement>) => {
        event.preventDefault()
        const resp = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({EMAIL: formInput.email, PASSWORD: formInput.password})
        });
        if(resp.status != 200) toast.error((await resp.json()).message, { theme: 'dark'});
        else {
            await router.push('/dashboard')
        }
    }
    return (
        <>
            <h1 className="font-mono text-center mt-5 md:mt-9 text-6xl md:text-7xl text-slate-100 mx-auto">
                {' '}
                QP Generator{' '}
            </h1>
            <p className="font-mono text-center my-3 text-lg md:text-xl text-gray-500 text-shadow-gray italic">
                Generate the questions with ease!
            </p>
            <div className="m-auto w-80 md:w-1/2 lg:w-1/3">
                <form className="bg-gray-800 shadow-2xl rounded px-8 pt-6 pb-8 mb-4" onSubmit={e => Login(e)}>
                    <p className="font-mono text-center my-5 text-xl text-violet-600 text-shadow-violet">
                        Welcome back! Login to continue
                    </p>
                    <div className="mb-4">
                        <label
                            className="font-mono block text-slate-100 text-md font-bold mb-2"
                            htmlFor="email"
                        >
                            <div className="flex justify-start">
                                <MdAlternateEmail size={21} />
                                <span className="mx-2">Email</span>
                            </div>
                        </label>
                        <input
                            className="font-mono shadow peer appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:italic"
                            id="email" name="email"
                            type="email"
                            placeholder="yourname@bmsit.in"
                            autoFocus
                            value={formInput.email}
                            onChange={handleFormInput}
                        />
                        <p className="font-mono text-pink-500 invisible peer-invalid:visible text-xs italic">
                            Invalid Email
                        </p>
                    </div>
                    <div className="mb-4">
                        <label
                            className="font-mono block text-slate-100 text-md font-bold mb-2"
                            htmlFor="password"
                        >
                            <div className="flex justify-start">
                                <FaKeyboard size={22} />
                                <span className="mx-2">Password</span>
                            </div>
                        </label>
                        <input
                            className="font-mono shadow peer appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline placeholder:italic"
                            id="password" name='password'
                            type="password"
                            placeholder="******"
                            value={formInput.password}
                            onChange={handleFormInput}
                        />
                        <p className="text-pink-500 invisible peer-invalid:visible text-xs italic">
                            Enter valid password
                        </p>
                    </div>
                    <div className="flex items-center justify-end">
                        <button
                            className="font-mono bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            <div className="flex justify-start">
                                <FaLock size={21} />
                                <span className="mx-2">Sign In</span>
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Home;
