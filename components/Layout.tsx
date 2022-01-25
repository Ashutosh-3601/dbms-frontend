import Header from './Header';
import type { NextPage } from 'next';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
//import '../node_modules/react-toastify/dist/'

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <main className="flex flex-col justify-between min-w-screen w-full h-full min-h-screen overflow-hidden bg-slate-900">
                <Header />
                {children}
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
                <Footer />
                </main>
        </>
    );
};

export default Layout;
