import { Dispatch, Fragment, SetStateAction, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaPencilAlt } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';
import { IQuestionViewer } from '../lib/types';
import { useRouter } from 'next/router';


const QuestionViewer = ({ open, handler, context, instructor }: IQuestionViewer) => {
  const router = useRouter()
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handler}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-60 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-pink-500 align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-gray-800 px-4 pb-2 sm:p-4 sm:pb-2">
                <div className="sm:flex sm:items-start">
                  <div className=" text-center sm:mt-2 sm:my-2 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-2xl font-mono leading-6 font-medium text-slate-100">
                      Question
                    </Dialog.Title>
                    <div className="mt-2 w-full bg-slate-500 rounded-md p-3">
                      <p className="text-base text-slate-100 break-words whitespace-pre-wrap">
                      {`${context.text}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 px-4 py-1 sm:flex sm:flex-row-reverse">
              <div className="flex basis-1/2">
              <button
                    className="font-mono inline-flex justify-center bg-inherit hover:bg-red-700 text-red-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-red-600 rounded-full focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => handler(false)}>
                    <div className="inline-flex justify-center items-center md:justify-start">
                        <MdCancel size={21} />
                        <span className=" mx-1 md:mx-2">Cancel</span>
                    </div>
                </button>
              {(instructor.id == context.author?.id ? 
              <button
                    className={(instructor.id == context.author?.id ? 'inline-flex' : 'hidden') + " font-mono justify-center bg-inherit hover:bg-violet-700 text-violet-600 hover:text-slate-50 font-bold mx-auto my-2 py-2 px-4 border border-violet-600 rounded-full focus:outline-none focus:shadow-outline"}
                    type="button"
                    onClick={() => router.push({
                      pathname: `/manage/${context.code}`,
                      query: {ctx: context.id}
                    }, `/manage/${context.code}`)}>
                    <div className="inline-flex justify-center items-center md:justify-start">
                        <FaPencilAlt size={21} />
                        <span className=" mx-1 md:mx-2">Edit</span>
                    </div>
                </button>
                : <></>)}
                </div>
                <div className='flex basis-1/2 items-center'>
                <p className="font-mono text-base text-violet-600">
                        Added by {context.author ? `${context.author.fname} ${context.author.lname}`: 'N/A'} on {new Date(context.date).toLocaleDateString()}
                    </p>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
};

export default QuestionViewer;