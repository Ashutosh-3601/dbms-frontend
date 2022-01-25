import { IncomingMessage } from "http";
// import type { GetServerSidePropsContext } from "next";
import redis from "./Redis";
import { Instructor, IsLoggedInError } from "./types";

const LoginChecker = async (req: IncomingMessage) : Promise<IsLoggedInError|Instructor> => {
    const redirectToRoot = () => {
        return {
            error: true,
            redirect: {
                permanent: false,
                destination: '/'
            }
        }
    }
    const cookies = req.headers.cookie;
    if (!cookies) {
        return redirectToRoot();
    }
    const sessionIDCookie = cookies.split('=').indexOf('sessionID')
    if (sessionIDCookie === -1) {
        return redirectToRoot();
    }
    const sessionID = cookies.split('=')[sessionIDCookie + 1];
    const loggedIn = await redis.get(sessionID);
    if (!loggedIn) return redirectToRoot();
    else return (JSON.parse(loggedIn) as Instructor)
}
export { LoginChecker }
