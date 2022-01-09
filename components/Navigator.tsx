import Link from 'next/link';

interface NavProps {
    username: string,
    navigation: NavURL[]
}
interface NavURL {
    name: string,
    path: string,
    highlight: boolean
}
interface INavLink {
    nav: NavURL,
}

const NavLinks = ({ nav } : INavLink) => {
    return (
        <p className="font-mono text-lg text-center text-gray-700">
        <Link href={nav.path}>
            <a className={"text-violet-600 hover:text-violet-700 hover:underline " + (nav.highlight ? "text-shadow-violet": "")}>
                {nav.name}
            </a>
        </Link>
        /
    </p>
    )
}

const Navigator = ({ username, navigation } : NavProps) => {
    return (
        <div className="flex flex-row flex-wrap m-4 px-2">
                <div className="flex flex-row flex-wrap justify-start items-start w-full md:w-1/2 px-2">
                    <p className="font-mono items-start text-left text-2xl text-white mx-2">
                        Hello,
                        <span className="text-violet-600 mx-1 text-shadow-violet">
                            {username}
                        </span>
                    </p>
                </div>
                <div className="flex flex-wrap justify-end w-full md:w-1/2 items-center px-2">
                    {navigation.map((nav, idx) => <NavLinks nav={nav} key={idx} />)} 
                </div>
            </div>
    );
}

export default Navigator;