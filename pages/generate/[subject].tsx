import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { MdGeneratingTokens, MdSubway } from "react-icons/md";
import { MultiValue } from "react-select";
import { toast } from "react-toastify";
import ModuleSelection from "../../components/GeneratorForm/ModuleSelection";
import TopicSelection from "../../components/GeneratorForm/TopicSelection";
import Navigator from "../../components/Navigator";
import { LoginChecker } from "../../lib/LoginChecker";
import { NavGen } from "../../lib/NavGen";
import { SubjectMapper } from "../../lib/SubjectMapper";
import { GeneratorModule, IGenerateProps, ModuleTopic, Subjects } from "../../lib/types";

const Generate = ({ path, instructor }: IGenerateProps) => {
    const router = useRouter();
    const [moduleSelected, setModuleSelected] = useState<number[]>([]);
    const [AllTopicsSelected1, setAllTopicsSelected1] = useState<string[]>([]);
    const [AllTopicsSelected2, setAllTopicsSelected2] = useState<string[]>([]);
    const handleModuleSelection = (event: MultiValue<GeneratorModule>) => {
        setModuleSelected(event.map(mod => mod.value));
    }
    const handleTopicSelection1 = (event: MultiValue<ModuleTopic>) => {
        setAllTopicsSelected1(event.map(t => t.value))
    }
    const handleTopicSelection2 = (event: MultiValue<ModuleTopic>) => {
        setAllTopicsSelected2(event.map(t => t.value))
    }

    const generateQuestions = async () => {
        if(!moduleSelected.length) return toast.error('No modules selected', { theme: 'dark'})
        router.push({
            pathname: `/preview/${path.code}`,
            query: {ctx: JSON.stringify({ mod: moduleSelected, topic1: AllTopicsSelected1, topic2: AllTopicsSelected2 })}
        }, `/preview/${path.code}`);
    }
    return (<>
    <Navigator navigation={NavGen(router.asPath, {pathName: path.code, pathLoc: path.code})} username={`${instructor.fname} ${instructor.lname}`} />
        <h1 className={'font-mono text-center m-5 md:mt-9 text-3xl md:text-7xl text-slate-100 mx-auto'}>
            Generate Question Paper
        </h1>
        <p className="font-mono text-center mb-2 md:mb-9 text-lg md:text-3xl text-violet-600 text-shadow-violet italic">
                {path.name}
        </p>
        <div className="flex flex-col flex-wrap w-full">
            <div className="w-80 md:w-4/5 my-2 mx-auto bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 font-mono">
            <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 my-4 mx-2">
                <MdSubway size={35} />
                <span className="mx-2">Select Syllabus</span>
            </h3>
            <form className="items-center sm:w-full md:w-11/12 bg-gray-800 mx-auto" autoComplete="off" >
                <ModuleSelection selectedOptions={moduleSelected} handler={handleModuleSelection}/>
                {moduleSelected.at(0) ? (
                    <TopicSelection mod={moduleSelected.at(0) as number} sub={path.code} selectedTopics={AllTopicsSelected1} handler={handleTopicSelection1}/>
                ) : <></> }
                {moduleSelected.at(1) ? (
                <TopicSelection mod={moduleSelected.at(1) as number} sub={path.code} selectedTopics={AllTopicsSelected2} handler={handleTopicSelection2}/>
                ) : <></> }
            <button className="flex justify-center font-mono bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold py-2 px-4 mx-auto my-2 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
            type="button" onClick={generateQuestions}>
                <div className="flex justify-start">
                    <MdGeneratingTokens size={21} />
                    <span className="mx-2">Generate</span>
                </div>
            </button>             
            </form>
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
    const { subject } = context.query;
    if(subject !== instructor.sub1 && subject !== instructor.sub2) return { notFound : true }
    const path = SubjectMapper.getPathName(subject as Subjects);
    return {
        props: { path, instructor},
    };
};

export default Generate;