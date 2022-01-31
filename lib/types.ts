import type { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import type { MultiValue } from 'react-select';
import type { QuestionGen } from './QuestionGen';

export type Subjects = '18CS51' | '18CS52' | '18CS53' | '18CS54' | '18CS55' | '18CS56';

export interface DynamicPath {
    code: string;
    name: string;
}

export interface BaseQuestion {
    id: string;
    code: string;
    module: number;
    qno: number;
    text: string;
    figure: string | null;
    type: number;
    author: Instructor | PartialInstructor| null;
    date: number;
    topics: string[]
}

export type PartialQuestion = Partial<BaseQuestion>

export interface ISubjectQuestion {
    path: DynamicPath;
    questions: BaseQuestion[];
    instructor: Instructor;
}

export interface Topics {
    topic: string
}

export interface ModuleTopic {
    readonly value: string;
    readonly label: string;
}

export interface IQuestionTableProp {
    question: BaseQuestion[];
    logger: (e: MouseEvent<HTMLTableRowElement>) => any;
}

export interface IQuestionViewer {
    open: boolean,
    handler: Dispatch<SetStateAction<boolean>>,
    context: BaseQuestion,
    instructor: Instructor;
}

export interface IQuestionEditingProps {
    path: DynamicPath;
    instructor: Instructor;
    context: QuestionFormState;
}

export interface IGenerateProps {
    path: DynamicPath,
    instructor: Instructor;
}

export interface GeneratorModule {
    label: string;
    value: number;
}

export interface IBaseGen {
    handler: (e: MultiValue<GeneratorModule>) => any;
}

export interface IGenModuleSelector extends IBaseGen {
    selectedOptions: number[]
}

export interface IGenTopicSelector {
    mod: number;
    sub: string,
    selectedTopics: string[];
    handler: (e: MultiValue<ModuleTopic>) => any
}

export interface IPreviewProps {
    path: DynamicPath,
    instructor: Instructor;
    questions: null | BaseQuestion[]
}

/**
 * Form Interfaces
 */

export interface QuestionFormState {
    'question_type': [number],
    'question_module': [number],
    'question_topic': ModuleTopic[],
    'question': [string],
    'question_figure': any;
    'question_id': string | null;
}

export interface BaseQuestionForm {
    handler: (event: MouseEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement | HTMLInputElement> ) => any
}

export interface IQuestionType extends BaseQuestionForm {
    init: [number]
}

export interface IQuestionModule extends BaseQuestionForm {
    init: [number]
}

export interface IQuestionTopic {
    init: ModuleTopic[],
    moduleSelected: number,
    handler: (event: MultiValue<ModuleTopic> ) => any
}

export interface IQuestionInput extends BaseQuestionForm {
    init: string[]
}

export interface IQuestionFigure extends BaseQuestionForm {
    init: [File | null | ''] | [],
}

export interface ModuleTopic {
    readonly value: string;
    readonly label: string;
}

export interface ITopicSelector {
    selectedOptions: ModuleTopic[],
    moduleSelected: number,
    handler: (event: MultiValue<ModuleTopic> ) => any
}

export interface IPreviewer {
    context: PartialQuestion | undefined;
    curNo?: number;
}

export interface IExtendedPreviewer {
    curNo: number;
    question: BaseQuestion | undefined;
}

export interface BaseUserForm {
    handler: (event: MouseEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => void;
}

export interface IUserName extends BaseUserForm {
    init : {
        fname: string,
        lname: string
    }
}

export interface IUserEmail extends BaseUserForm {
    init: string
}

export interface IUserPassword extends BaseUserForm {
    init: string
}

export interface IUserSubject extends BaseUserForm {
    sub: number;
    init: string | null;
}

export interface Instructor {
    id: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    sub1: string;
    sub2: string;
    isAdmin: boolean;
}

export type PartialInstructor = Partial<Instructor>;

export interface IsLoggedInError {
    error: boolean;
    redirect: {
        permanent: boolean,
        destination: string;
    }
}

export interface Stats {
    sub1LastAddition: number;
    sub2LastAddition: number | null;
    sub1TotalQuestion: number;
    sub2TotalQuestion: number | null;
}

export interface IDashboardProps extends Stats {
    name: string,
    sub1: string,
    sub2?: string,
    sub1Short: string;
    sub2Short?: string;
}