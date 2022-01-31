import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { NavGen } from '../../lib/NavGen';
import Navigator from '../../components/Navigator';
import QuestionTable from '../../components/QuestionTable';
import QuestionViewer from '../../components/QuestionViewer';
import { useRouter } from 'next/router';
import { MouseEvent, useState, useEffect } from 'react';
import { FaFileUpload, FaQuestion } from 'react-icons/fa';
import { PartialQuestion, ISubjectQuestion, Subjects, BaseQuestion } from '../../lib/types';
import { LoginChecker } from '../../lib/LoginChecker';
import { SubjectMapper } from '../../lib/SubjectMapper';
import { QuestionCache } from '../../lib/QuestionCache';

const Subject = ({ path, questions, instructor } : ISubjectQuestion) => {
    const router = useRouter();
    //const [allQuestion, setAllQuestion] = useState<IQuestion[]>([{id: -1, question: "Loading", author: "Loading"}]);
    // Modal Handling
    const [openQuestion, setOpenQue] = useState<boolean>(false);
    // Question Handler
    const [curQues, setCurQues] = useState<PartialQuestion>({id: 'N/A', text: "Loading", author: {fname: 'N/A', lname: 'N/A'}})

    const questionViewerOpener = (e: MouseEvent<HTMLTableRowElement>) => {
        e.preventDefault();
        setCurQues(questions.find(ques => ques.id === e.currentTarget.dataset.index) as PartialQuestion)
        //allQuestion.find(ques => ques.id == Number(e.currentTarget.dataset.index)) as IQuestion
        setOpenQue(!openQuestion);
    }
    return (
        <>
        <QuestionViewer open={openQuestion} handler={setOpenQue} context={curQues as BaseQuestion} instructor={instructor}/>
            <Navigator navigation={NavGen(router.asPath, {pathName: path.code, pathLoc: path.code })} username={`${instructor.fname} ${instructor.lname}`} />
            <h1
                className={
                    'font-mono text-center m-5 md:mt-9 ' +
                    (path.name.length > 7 ? 'text-3xl' : 'text-5xl') +
                    ' md:text-7xl text-slate-100 mx-auto'}>
                {path.name}
            </h1>
            <div className="flex flex-col mx-auto justify-center items-center">
                <button
                    className="font-mono block align-middle bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => router.push(`/generate/${path.code}`)}>
                    <div className="flex justify-center items-center md:justify-start">
                        <FaFileUpload size={21} />
                        <span className=" mx-1 md:mx-2">{`Generate Question Paper for ${path.code} - ${path.name}`}</span>
                    </div>
                </button>
            </div>
            <div className="flex flex-wrap justify-evenly">
                <div className="flex w-80 md:w-1/2 justify-center my-2">
                    <div className="flex flex-col w-80 md:w-11/12 bg-gray-800 rounded-lg shadow-xl">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <FaQuestion size={35} />
                        <span className="text-center">All Questions</span>
                    </h3>
                    <p className="block text-lg text-violet-600 text-center italic mt-0.5 mb-2 mx-2">
                        Click on the question to get detailed view
                    </p>
                    <QuestionTable question={questions} logger={questionViewerOpener}/>
                    </div>
                </div>
                <div className="flex w-80 md:w-1/2 justify-center my-2">
                    <div className="flex flex-col w-80 md:w-11/12 bg-gray-800 rounded-lg shadow-xl">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <FaQuestion size={35} />
                        <span className="">Your Questions</span>
                    </h3>
                    <p className="block text-lg text-violet-600 text-center italic mt-0.5 mb-2 mx-2">
                        Click on the question to get detailed view
                    </p>
                    <QuestionTable question={questions.filter(q => q.author?.id === instructor.id)} logger={questionViewerOpener}/>
                    <button
                    className="font-mono block align-middle bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => router.push(`/manage/${path.code}`)}>
                    <div className="flex justify-center items-center md:justify-start">
                        <FaFileUpload size={21} />
                        <span className=" mx-1 md:mx-2">Add New Question</span>
                    </div>
                </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const instructor = await LoginChecker(context.req);
    if('error' in instructor) return { redirect : instructor.redirect };
    if(instructor.isAdmin) return {
        redirect: {
            permanent: false,
            destination: '/admin'
        }
    }
    const { id } = context.query
    if(id !== instructor.sub1 && id !== instructor.sub2) return { notFound : true }
    const path = SubjectMapper.getPathName(id as Subjects);
    let questions = await QuestionCache(id);
    if('error' in questions) {
        questions = [{id: 'N/A', text: 'Error fetching questions', author: {fname: 'N/A', lname: 'N/A'}}] as unknown as BaseQuestion[]
    }
    return {
        props: { path, questions, instructor }
    };
};

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export default Subject;