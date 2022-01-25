import { ModuleTopic, QuestionFormState } from "./types";

export class CreateQuestionDto {
    //CODE, MODULE, QNO, TEXT, TYPE
    ID: string | null;
    /**
     * The Subject Code
     */
    CODE: string;
    /**
     * Module Number
     */
    MODULE: number;
    /**
     * Question Number
     */
    //QNO: number;
    /**
     * Text as actual question
     */
    TEXT: string;
    /**
     * Location of figure stored on frontend machine
     */
    FIGURE?: string | null;
    /**
     * Type of Question
     */
    TYPE: number;
    /**
     * Name of question author id
     */
    AUTHOR?: string;
    TOPIC: string[];
    constructor(formInput: QuestionFormState, sub: string, author: string) {
        this.ID = formInput.question_id;
        this.CODE = sub;
        this.MODULE = formInput.question_module[0];
        this.TEXT = formInput.question[0];
        this.AUTHOR = author;
        this.FIGURE = null;
        this.TYPE = formInput.question_type[0];
        this.TOPIC = this.getTopics(formInput.question_topic);
    }
    getTopics(topics: ModuleTopic[]) {
        const returnableTopic = []
        for(const topic of topics) {
            returnableTopic.push(topic.value);
        }
        return returnableTopic;
    }
  }
  