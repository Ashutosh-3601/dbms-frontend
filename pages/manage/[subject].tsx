import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { FaPencilAlt, FaSearch } from 'react-icons/fa';
import { MdOutlineAddCircle } from 'react-icons/md';
import Navigator from '../../components/Navigator';
import QuestionInput from '../../components/QuestionForm/QuestionInput';
import QuestionModule from '../../components/QuestionForm/QuestionModule';
import QuestionTopic from '../../components/QuestionForm/QuestionTopic';
import QuestionType from '../../components/QuestionForm/QuestionType';
import { IQuestionEditingProps, QuestionFormState, Subjects } from '../../lib/types';
import { NavGen } from '../../lib/NavGen'
import { GetInitialForm, QuestionForm } from '../../lib/QuestionForm';
import Previewer from '../../components/Previewer';
import { SubjectMapper } from '../../lib/SubjectMapper';
import { LoginChecker } from '../../lib/LoginChecker';
import { getQuestionByID } from '../../lib/QuestionCache';

const SubjectManagement = ({ path, instructor, context } : IQuestionEditingProps) => {4
    const router = useRouter();
    const [formState, setFormState] = useState<QuestionFormState>(context);
    const IsEditing = formState.question_id ? 'Edit' : 'Add';
    const onChangeHandler = (event: MouseEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | any) => {
        // Probably we have multivalued selection which is returned as Array so need separate handling
        if(Array.isArray(event)) {
            setFormState({ ...formState, 'question_topic': event})
        }
        else if(event.currentTarget.files?.length){
            setFormState({
                ...formState,
                [event.currentTarget.name]: [event.currentTarget.files[0]],
            })
        }
        else setFormState({
            ...formState,
            [event.currentTarget.name]: [event.currentTarget.value],
        })
    }
    return (
        <>
        <Navigator navigation={NavGen(router.asPath, {pathName: path.code, pathLoc: path.code})} username={`${instructor.fname} ${instructor.lname}`} />
            <h1 className={'font-mono text-center m-5 md:mt-9 ' + (path.name.length > 7 ? 'text-3xl' : 'text-5xl') + ' md:text-7xl text-slate-100 mx-auto'}>
                {path.name}
            </h1>
            <div className="flex flex-wrap justify-evenly">
                <div className="flex w-80 md:w-3/5 justify-center my-2">
                    <div className="flex flex-col justify-center w-80 md:w-11/12 bg-gray-800 rounded-lg shadow-xl">
                        <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                            <FaPencilAlt size={35} />
                            <span className="mx-2 md:mx-4 mb-2 md:mb-4">Manage Question</span>
                        </h3>
                        <form onSubmit={e => QuestionForm(e, formState, setFormState, path.code, instructor.id)}>
                            <QuestionType init={formState.question_type} handler={onChangeHandler}/>
                            <QuestionModule init={formState.question_module} handler={onChangeHandler}/>
                            <QuestionTopic moduleSelected={Number(...formState.question_module)} init={formState.question_topic} handler={onChangeHandler}/>
                            <QuestionInput init={formState.question} handler={onChangeHandler}/>
                            <div className="flex items-center justify-end">
                        <button
                            className="font-mono bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold py-2 px-4 mx-auto my-2 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"
                            type="submit">
                            <div className="flex justify-start">
                                <MdOutlineAddCircle size={21} />
                                <span className="mx-2">{IsEditing}</span>
                            </div>
                        </button>
                    </div>
                        </form>
                    </div>
                </div>

                <div className="flex w-80 md:w-2/5 justify-center my-2">
                    <div className="flex flex-col w-80 md:w-11/12 bg-gray-800 rounded-lg shadow-xl">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                            <FaSearch size={35} />
                            <span className="mx-2 md:mx-4 mb-2 md:mb-4">Preview</span>
                        </h3>
                    <p className="block text-lg text-violet-600 text-center italic mt-0.5 mb-2 mx-2">
                        Your question will roughly appear on paper as
                    </p>
                    <Previewer context={{text: formState.question[0]}} />
                    </div>
                </div>
            </div>
        </>
    )
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
    const { ctx, subject } = context.query;
    if(subject !== instructor.sub1 && subject !== instructor.sub2) return { notFound : true }
    const path = SubjectMapper.getPathName(subject as Subjects);
    const quesCtx = await getQuestionByID(path.code, ctx as string);
    return {
        props: { path, instructor, context: GetInitialForm(quesCtx)},
    };
};

export default SubjectManagement;