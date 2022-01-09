import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Navigator from '../../components/Navigator';
import QuestionTable from '../../components/QuestionTable';
import { useRouter } from 'next/router';
import { MouseEvent, useState, useEffect } from 'react';
import { FaFileUpload, FaQuestion } from 'react-icons/fa';
import QuestionViewer from '../../components/QuestionViewer';

export interface IQuestion {
    id: number,
    question: string,
    fig?: string,
    author: string
}

const Subject = ({ page } : InferGetServerSidePropsType<GetServerSideProps>) => {
    const router = useRouter();
    const [allQuestion, setAllQuestion] = useState<IQuestion[]>([{id: -1, question: "Loading", author: "Loading"}]);
    // Modal Handling
    const [openQuestion, setOpenQue] = useState<boolean>(false)

    const questionViewerOpener = (e: MouseEvent<HTMLTableRowElement>) => {
        e.preventDefault();
        console.log(e.currentTarget.dataset.index)
        setOpenQue(!openQuestion);
    }

    useEffect(() => {
        const questions: IQuestion[] = [
            {
                id: 123,
                question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                author: 'hh'
            },
            {
                id: 245,
                question: ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                author: 'hh'
            },
        ]
        setAllQuestion(questions)
    }, []);

    const currentNav = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            highlight: false,
        },
        {
            name: page.code,
            path: router.asPath,
            highlight: true,
        },
    ];

    return (
        <>
        <QuestionViewer open={openQuestion} handler={setOpenQue}/>
            <Navigator navigation={currentNav} username={'Ashutosh Raj'} />
            <h1
                className={
                    'font-mono text-center m-5 md:mt-9 ' +
                    (page.name.length > 7 ? 'text-3xl' : 'text-5xl') +
                    ' md:text-7xl text-slate-100 mx-auto'
                }
            >
                {page.name}
            </h1>
            <div className="flex flex-col mx-auto justify-center items-center">
                <button
                    className="font-mono block align-middle bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={(e) => e}
                    value={'generate'}
                >
                    <div className="flex justify-center items-center md:justify-start">
                        <FaFileUpload size={21} />
                        <span className=" mx-1 md:mx-2">{`Generate Question Paper for ${page.code} - ${page.name}`}</span>
                    </div>
                </button>
            </div>
            <div className="flex flex-wrap justify-evenly">
                <div className="flex w-80 md:w-1/2 justify-center my-2">
                    <div className="flex flex-col justify-center w-80 md:w-11/12 bg-gray-800 rounded-lg shadow-xl">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <FaQuestion size={35} />
                        <span className="">All Questions</span>
                    </h3>
                    <p className="block text-lg text-violet-600 text-center italic mt-0.5 mb-2 mx-2">
                        Click on the question to get detailed view
                    </p>
                    <QuestionTable question={allQuestion} logger={questionViewerOpener}/>
                    </div>
                </div>
                <div className="flex w-80 md:w-1/2 bg-blue-800 justify-center my-2">
                    <div className="flex justify-center w-80 md:w-11/12 bg-gray-800 rounded-lg shadow-xl">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <FaQuestion size={35} />
                        <span className="">Your Questions </span>
                    </h3>
                    </div>
                </div>
            </div>
        </>
    );
};

const handleClick = () => {
    console.log('clicked');
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const Data = {
        '18CS51': {
            code: '18CS51',
            name: 'Entrepreneurship',
        },
        '18CS52': {
            code: '18CS52',
            name: 'cOMPUTER nETWORDS',
        },
    };
    const requestedPage = context.params?.id
        ? getProperty(Data, context.params.id as Subjects)
        : null;
    return {
        props: {
            page: requestedPage,
        },
    };
};

type Subjects = '18CS51' | '18CS52';

function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
    return o[propertyName]; // o[propertyName] is of type T[K]
}

export default Subject;
