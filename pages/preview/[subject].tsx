import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdGeneratingTokens, MdSubway } from "react-icons/md";
import { toast } from "react-toastify";
//import ExtendedPreviewer from "../../components/ExtendedPreviewer";
const ExtendedPreviewer = dynamic(
    () => import('../../components/ExtendedPreviewer'),
    { ssr: false }
  )
import Navigator from "../../components/Navigator";
import { LoginChecker } from "../../lib/LoginChecker";
import { NavGen } from "../../lib/NavGen";
import { QuestionGen } from "../../lib/QuestionGen";
import { SubjectMapper } from "../../lib/SubjectMapper";
import { BaseQuestion, IPreviewProps, Subjects } from "../../lib/types";

const Preview = ({ path, instructor, questions }: IPreviewProps) => {
    const router = useRouter();
    //if(!questions) return toast.error('Cannot load question', { theme: 'dark'});    
    const [selectedQues, setSelectedQues] = useState<BaseQuestion[]>([]);
    useEffect(() => {
        if (questions) {
            const ques = []
            let ultimateSource = [...questions] 
            for(const t of [1,1,1,1,1,1,2,3]) {
                const q = QuestionGen(ultimateSource, t);
                if('selectedQues' in q) {
                    ques.push(q.selectedQues);
                    ultimateSource = [...q.remainingQuestion];
                }
            }
            setSelectedQues(ques);
        }
    }, [questions]);
    return (<>
    <Navigator navigation={NavGen(router.asPath, {pathName: path.code, pathLoc: path.code})} username={`${instructor.fname} ${instructor.lname}`} />
        <h1 className={'font-mono text-center m-5 md:mt-9 text-3xl md:text-7xl text-slate-100 mx-auto'}>
            Preview Question Paper
        </h1>
        <p className="font-mono text-center mb-2 md:mb-9 text-lg md:text-3xl text-violet-600 text-shadow-violet italic">
                {path.name}
        </p>
        <div className="flex flex-col flex-wrap w-full">
            <div className="w-80 md:w-9/12 my-2 mx-auto bg-gray-700 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 font-mono">
            <ExtendedPreviewer curNo={1} question={selectedQues[0]}/>
            <p className="flex justify-center items-center text-lg text-slate-100 text-shadow-white text-center italic py-1 mx-2">
            OR
            </p>
            <ExtendedPreviewer curNo={2} question={selectedQues[1]}/>
            <ExtendedPreviewer curNo={3} question={selectedQues[2]}/>
            <p className="flex justify-center items-center text-lg text-slate-100 text-shadow-white text-center italic py-1 mx-2">
            OR
            </p>
            <ExtendedPreviewer curNo={4} question={selectedQues[3]}/>
            <ExtendedPreviewer curNo={5} question={selectedQues[4]}/>
            <p className="flex justify-center items-center text-lg text-slate-100 text-shadow-white text-center italic py-1 mx-2">
            OR
            </p>
            <ExtendedPreviewer curNo={6} question={selectedQues[5]}/>
            <p className="flex justify-center items-center text-lg text-slate-100 text-shadow-white text-center italic py-1 mx-2">
            PART B - INNOVATIVE and CASE STUDY
            </p>
            <ExtendedPreviewer curNo={7} question={selectedQues[6]}/>
            <ExtendedPreviewer curNo={8} question={selectedQues[7]}/>
            </div>
        </div>
    </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const instructor = await LoginChecker(context.req);
    if('error' in instructor) return { redirect : instructor.redirect };
    if(instructor.isAdmin) return {
        redirect: {
            permanent: false,
            destination: '/admin'
        }
    }
    const { subject, ctx } = context.query;
    if(!ctx) return {
        redirect: {
            permanent: false,
            destination: `/generate/${subject}`
        }
    }
    const { mod, topic1, topic2 } = JSON.parse(ctx as string);
    if(subject !== instructor.sub1 && subject !== instructor.sub2) return { notFound : true }
    const path = SubjectMapper.getPathName(subject as Subjects);
    const questions: {message: BaseQuestion[]} | {error: true, message: string} = await fetch(`http://localhost:3000/api/generate/`, {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code: path.code, mod: mod, topics: [(topic1 as string[]), (topic2 as string[])]})
        }).then(r => r.json());
        if('error' in questions) return {props : {path, instructor, question: null}}
    return {
        props: { path, instructor, questions: questions.message},
    };
};

export default Preview;