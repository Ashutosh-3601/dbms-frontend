import type { NextPage } from 'next';
import Navigator from '../components/Navigator';
import { useRouter } from 'next/router';
import { RiBookFill } from 'react-icons/ri';
import {
    MdOutlineAddCircle,
    MdSubject,
    MdQueryStats,
    MdQuestionAnswer,
} from 'react-icons/md';
import { MouseEvent } from 'react';

const Dashboard: NextPage = () => {
    const router = useRouter();
    const currentNav = [
        {
            name: "Dashboard",
            path: "/dashbaord",
            highlight: true
        }
    ]
    
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(`/subjects/${e.currentTarget.value}`);
    };


    return (
        <>
        <Navigator username={"Ashutosh Raj"} navigation={currentNav} />  
            <h1 className="font-mono text-center mt-2 md:mt-9 text-xl md:text-7xl text-slate-100">
                Personnal Dashboard
            </h1>
            <p className="font-mono text-center mb-2 md:mb-9 text-lg md:text-3xl text-gray-500 text-shadow-gray italic">
                Manage Your Subjects
            </p>
            <div className="flex flex-row flex-wrap justify-around m-4 px-2">
                <div className="w-80 md:w-1/3 m-2 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 font-mono">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <MdSubject size={35} />
                        <span className="mx-">Your Subjects</span>
                    </h3>
                    <p className="block text-lg text-violet-600 text-center italic mt-0.5 mb-12 mx-2">
                        List of subjects you handle
                    </p>
                    <button
                        className="font-mono block align-middle bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={(e) => handleClick(e)}
                        value={'18CS51'}
                    >
                        <div className="flex justify-start">
                            <RiBookFill size={21} />
                            <span className="mx-2">Subject 1 - 18CS51</span>
                        </div>
                    </button>
                    <button
                        className="font-mono block align-middle bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={(e) => handleClick(e)}
                        value={'18CS52'}
                    >
                        <div className="flex justify-start">
                            <RiBookFill size={21} />
                            <span className="mx-2">Subject 2 - 18CS52</span>
                        </div>
                    </button>
                </div>
                <div className="w-80 md:w-1/3 m-2 bg-gray-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 rounded-lg font-mono">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <MdQueryStats size={35} />
                        <span className="mx-2">Your Stats</span>
                    </h3>
                    <p className="block text-lg text-violet-600 text-center italic my-0.5 mx-2">
                        Some of your statistics on subjects handled by you
                    </p>
                    <div className="space-x-6">
                        {/* Last class is idk some kinda shitty fix :(*/}
                    <p className="flex justify-start text-slate-100 opacity-70 px-8 py-2">
                        <MdOutlineAddCircle size={20} />
                        <span className="mx-2">Last Question Added - N/A</span>
                    </p>
                    <p className="flex justify-start text-slate-100 opacity-70 p-2">
                        <MdOutlineAddCircle size={21} />
                        <span className="mx-2">
                            Last Question Added in Subject 1 - N/A
                        </span>
                    </p>
                    <p className="flex justify-start text-slate-100 opacity-70 p-2">
                        <MdOutlineAddCircle size={21} />
                        <span className="mx-2">
                            Last Question Added in Subject 2 - NA
                        </span>
                    </p>
                    <p className="flex justify-start text-slate-100 opacity-70 p-2">
                        <MdQuestionAnswer size={21} />
                        <span className="mx-2">Maybe more - N/A</span>
                    </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
