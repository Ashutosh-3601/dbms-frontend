import { IExtendedPreviewer } from "../lib/types";
import Previewer from "./Previewer";

const ExtendedPreviewer = ({curNo, question}: IExtendedPreviewer) => {
    return (
        <>
        <div className="flex flex-col flex-wrap w-full bg-gray-700 my-1">
            <div className="w-80 md:w-4/5 mx-auto bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl font-mono">
                <div className="mx-2 px-2 my-2 py-1">
                    <Previewer context={question} curNo={curNo}/>
                </div>
            </div>
        </div>
        </>
    )
}

export default ExtendedPreviewer;