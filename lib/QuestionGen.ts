import { BaseQuestion } from "./types";

const QuestionGen = (source: BaseQuestion[], type = 1 | 2 | 3) => {
    if(!source.length) return [];
    const selectedType = source.filter(q => q.type === type);
    if(!selectedType.length) return [];
    const selectedQues = selectedType[Math.floor(Math.random() * selectedType.length)];
    const remainingQuestion = removeItemQuestionWithID(source, selectedQues.id);
    return {selectedQues, remainingQuestion};
}

const removeItemQuestionWithID = (source: BaseQuestion[], value: string) => {
    let i = 0;
    while (i < source.length) {
      if (source[i].id === value) {
        source.splice(i, 1);
      } else {
        ++i;
      }
    }
    return source;
  }

export { QuestionGen };