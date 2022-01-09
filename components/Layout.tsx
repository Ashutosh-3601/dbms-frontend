import Header from './Header';
import type { NextPage } from 'next';
import Footer from './Footer';

const Layout: NextPage = ({ children }) => {
    return (
        <>
            <main className="flex flex-col justify-between min-w-screen w-full h-full min-h-screen overflow-hidden bg-slate-900">
                <Header />
                {children}
                <Footer />
            </main>
        </>
    );
};

export default Layout;
