import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../public/logo512.png';
const Header: NextPage = () => {
    return (
        <header className="flex flex-col md:flex-row w-screen h-24 md:h-16 bg-gray-800 font-mono">
            <nav className="flex">
                <Link href="/"><a className='flex justify-center items-center md:justify-start mx-4'>
                    <Image src={logo} alt="logo" height="64px" width="64px"></Image>
                <p className="uppercase inline-flex px-2 text-slate-50 text-xl">
                    QB Generator
                </p>
                </a></Link>
            </nav>
            <div className="flex flex-1 justify-start place-items-center md:justify-end">
                <nav className="inline-flex mx-auto md:mx-6">
                    <Link href="/dashboard">
                        <a className="text-slate-100">Dashboard</a>
                    </Link>
                </nav>
                <nav className="flex mx-auto md:mx-6">
                    <Link href="/">
                        <a className="text-slate-100">Logout</a>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
