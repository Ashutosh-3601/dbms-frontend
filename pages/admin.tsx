import { GetServerSideProps } from "next";
import { MdPerson, MdPersonAddAlt1 } from "react-icons/md";
import AddInstructorForm from "../components/AddInstructorForm";
import { LoginChecker } from "../lib/LoginChecker";

const Admin = () => {
    return (
        <>
        <h1 className="font-mono text-center mt-2 md:mt-9 text-xl md:text-7xl text-slate-100">
                Manage Instructors
        </h1>
        <div className="flex flex-row flex-wrap justify-around m-4 px-2">
                <div className="w-80 md:w-1/3 m-2 bg-gray-800 rounded-lg shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 font-mono">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <MdPersonAddAlt1 size={35} />
                        <span className="mx-2">Add New Instructor</span>
                    </h3>
                    <AddInstructorForm/>
                </div>
                <div className="w-80 md:w-1/3 m-2 bg-gray-800 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/50 rounded-lg font-mono">
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2">
                        <MdPerson size={35} />
                        <span className="mx-2">Modify Instructor</span>
                    </h3>
                    <h3 className="flex justify-center font-mono text-center text-3xl text-slate-100 mt-4 mx-2 my-auto">
                        <span className="mx-2">Coming Soon</span>
                    </h3>
                </div>
            </div>
        </>
    )
}

export default Admin;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const instructor = await LoginChecker(context.req);
    if('error' in instructor) return { redirect : instructor.redirect };
    if(!instructor.isAdmin) return {
        redirect: {
            permanent: false,
            destination: '/dashboard'
        }
    }
    return {
        props: {}
    }
}