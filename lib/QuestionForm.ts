import { Dispatch, FormEvent, ReactText, SetStateAction } from "react";
import { BaseQuestion, QuestionFormState } from "./types";
import { CreateQuestionDto } from  './TransformQuestion';
import { toast } from "react-toastify";
import { TopicLabelGen } from "./TopicLabelGen";
const InitialForm: QuestionFormState = {
    'question_type': [0],
    'question_module': [0],
    'question_topic': [],
    'question': [''],
    'question_figure': [],
    'question_id': null,
}

const GetInitialForm = (filledValues: BaseQuestion | null | undefined) => {
    if(!filledValues) return InitialForm;
    else return {
        'question_type': [filledValues.type],
        'question_module': [filledValues.module],
        'question_topic': TopicLabelGen(filledValues.topics),
        'question': [filledValues.text],
        'question_figure': [filledValues.figure],
        'question_id': filledValues.id,
    } as QuestionFormState
}

const QuestionForm = async (e: FormEvent<HTMLFormElement>, values: QuestionFormState, resetter: Dispatch<SetStateAction<QuestionFormState>>, sub: string, author: string) => {
    e.preventDefault();
    const id = toast.loading("Adding the Question...");
    if(!values.question_topic.length) {
        Notify(id, "error", "You need to provide atleast one topic.");
        return;
    }
    if(values.question[0].length < 10) {
        Notify(id, "error", "Questions should be atleast 20 chars long.");
        return;
    }
    const transformed = new CreateQuestionDto(values, sub, author);
    const res = await fetch(`http://localhost:3001/questions/${values.question_id ?? ''}`, {
        mode: 'cors',
        method: values.question_id ? 'PATCH' : 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(transformed)
    });
    if(res.status === 201 || res.status === 200) {
        Notify(id, "success", "Added the Question")
        await fetch(`http://localhost:3000/api/clear-question-cache?code=${sub}`);
    }
    else {
        const error = await res.json()
        console.log(error)
        Notify(id, "error", "Got some error\n" + error)
    }
    // Resets the radio button
    // @ts-ignore
    e.target.reset();
    resetter(InitialForm);
}

const Notify = (id: ReactText, ResultType: "success" | "error" , content: string) => {
    toast.update(id, { render: content, type: ResultType, isLoading: false , position: "top-right", theme: "dark",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined});
}

export { GetInitialForm, QuestionForm };