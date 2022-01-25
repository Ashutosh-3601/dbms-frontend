import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
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
import { LoginChecker } from '../lib/LoginChecker';
import { IDashboardProps, Instructor, Subjects } from '../lib/types';
import { SubjectMapper } from '../lib/SubjectMapper';
import { NavGen } from '../lib/NavGen';

const Dashboard = (props: IDashboardProps) => {
    const router = useRouter();
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        router.push(`/subjects/${e.currentTarget.value}`);
    };
    return (
        <>
        <Navigator username={props.name} navigation={NavGen(router.asPath, {pathName: '', pathLoc: ''})} />  
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
                        value={props.sub1}>
                        <div className="flex justify-start">
                            <RiBookFill size={21} />
                            <span className="mx-2">{`${props.sub1Short} - ${props.sub1}`}</span>
                        </div>
                    </button>
                    { props.sub2 ? (
                    <button
                        className="font-mono block align-middle bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                        type="button"
                        onClick={(e) => handleClick(e)}
                        value={props.sub2}>
                        <div className="flex justify-start">
                            <RiBookFill size={21} />
                            <span className="mx-2">{`${props.sub2Short} - ${props.sub2}`}</span>
                        </div>
                    </button>): <></>}
                </div>
                <div className="w-80 md:w-1/3 m-2 bg-gray-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 rounded-lg font-mono">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <MdQueryStats size={35} />
                        <span className="mx-2">Your Stats</span>
                    </h3>
                    <p className="block text-lg text-violet-600 text-center italic my-0.5 mx-2">
                        Some of your statistics on subjects handled by you
                    </p>
                    <div className="mx-1">
                        {/* Last class is idk some kinda shitty fix :(*/}
                    <p className="flex justify-start items-center text-slate-100 px-8 py-2">
                        <MdOutlineAddCircle size={20} />
                        <span className="mx-2 opacity-70">{`Last Question Added in ${props.sub1Short ?? 'Subject 1'} - `}</span>
                        <span className='mx-1 text-shadow-white'>
                            {props.sub1LastAddition ? new Date(props.sub1LastAddition).toLocaleDateString() : 'N/A'}
                        </span>
                    </p>
                    <p className="flex justify-start items-center text-slate-100 px-8 py-2">
                        <MdOutlineAddCircle size={20} />
                        <span className="mx-2 opacity-70">{`Last Question Added in ${props.sub2Short ?? 'Subject 2'} - `}</span>
                        <span className='mx-1 text-shadow-white'>
                            {props.sub2LastAddition ? new Date(props.sub2LastAddition).toLocaleDateString() : 'N/A'}
                        </span>
                    </p>
                    <p className="flex justify-start items-center text-slate-100 px-8 py-2">
                        <MdQuestionAnswer size={21} />
                        <span className="mx-2 opacity-70">{`Total Questions ${props.sub1Short ?? 'Subject 1'} - `}</span>
                        <span className='mx-1 text-shadow-white'>{props.sub1TotalQuestion}</span>
                    </p>
                    <p className="flex justify-start items-center text-slate-100 px-8 py-2">
                        <MdQuestionAnswer size={21} />
                        <span className="mx-2 opacity-70">{`Total Questions ${props.sub2Short ?? 'Subject 2'} - `}</span>
                        <span className='mx-1 text-shadow-white'>{props.sub2TotalQuestion ?? 'N/A'}</span>
                    </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
    const instructor = await LoginChecker(context.req);
    if('error' in instructor) return { redirect : instructor.redirect };
    if(instructor.isAdmin) return {
        redirect: {
            permanent: false,
            destination: '/admin'
        }
    }
    const stats = await fetch(`http://localhost:3001/instructors/stats/${instructor.id}`).then(r => r.json());
    let props = {
        name: `${instructor.fname} ${instructor.lname ?? ''}`,
        sub1: instructor.sub1,
        sub1Short: SubjectMapper.getShortNameSubject(instructor.sub1 as Subjects),
        ...stats
    }
    if(instructor.sub2) {
        props = {
            ...props,
            sub2: instructor.sub2,
            sub2Short: SubjectMapper.getShortNameSubject(instructor.sub2 as Subjects)
        }
    }
    return {
        props: props
    }
}

export default Dashboard;
