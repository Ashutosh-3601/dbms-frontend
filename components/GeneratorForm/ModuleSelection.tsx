import Select from 'react-select';
import { colourStyles } from '../../lib/SelectMenuStyles';
import { GeneratorModule, IGenModuleSelector, IQuestionTopic } from "../../lib/types";

const ModuleSelection = ({selectedOptions, handler}: IGenModuleSelector) => {
    return (
        <div className="md:flex md:items-center my-3">
        <div className="mx-2 md:mb-0 md:w-1/5">
            <label htmlFor='module_selection' className="font-mono text-slate-100 text-lg">Select Module</label>
        </div>
        <Select<GeneratorModule, true>
            name="topics"
            isMulti
            options={selectedOptions.length < 2 ? Modules(): []}
            placeholder={'Select The Modules (Max 2)'}
            value={Modules(selectedOptions)}
            className="w-full sm:ml-3 sm:mr-1 md:mx-2 mb-3"
            id='question_topic'
            instanceId='question_topic'
            // @ts-ignore
            styles={colourStyles}
            onChange={handler}/>
        </div>
    );
}

const Modules = (vals = [1,2,3,4,5]) : GeneratorModule[] => {
    const options = [];
    for(const i of vals) {
        options.push({
            label: `Module ${i}`,
            value: i,
        })
    }
    return options;
}

export default ModuleSelection;