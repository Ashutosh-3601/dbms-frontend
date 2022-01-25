import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo.png';
const Footer: NextPage = () => {
    return (
        <footer className="flex flex-wrap flex-row items-end w-screen bg-gray-800 font-mono">
            <div className="flex justify-center items-center w-full md:w-1/2">
                <Image src={logo} alt="logo" height="64px" width="64px"></Image>
                <p className="flex flex-col px-2 text-slate-50">
                    <span className="text-xl uppercase">QP Gen</span>
                    <span className="text-sm text-violet-600 text-shadow-violet">
                        Copyright © {new Date().getFullYear()} Ashutosh and Ayush
                    </span>
                </p>
            </div>
            <div className="flex justify-center items-center w-full md:w-1/2 space-x-6 lg:space-x-12 my-2">
                <div className="flex flex-col">
                    <Link href="/dashboard">
                        <a className="text-slate-100 hover:underline">
                            Dashboard
                        </a>
                    </Link>
                        <a href="https://github.com/Ashutosh-3601/dbms-frontend" className="text-slate-100 hover:underline">Frontend</a>
                </div>
                <div className="flex flex-col">
                    <Link href="/api/logout">
                        <a className="text-slate-100 hover:underline">Logout</a>
                    </Link>
                        <a href="https://github.com/Ashutosh-3601/dbms-backend" className="text-slate-100 hover:underline">
                            Backend
                        </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
