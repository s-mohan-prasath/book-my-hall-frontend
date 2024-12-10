"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {
    const menubar = useRef(null);
    const [isClient, setIsClient] = useState(false); // State to track client-side rendering
    const [authToken, setAuthToken] = useState(null);
    const [adminAuthToken, setAdminAuthToken] = useState(null);

    const menu = () => {
        if (menubar.current.classList.contains("hidden")) {
            menubar.current.classList.remove("hidden");
        } else {
            menubar.current.classList.add("hidden");
        }
    };

    const handleUserLogout = () => {
        Cookies.remove("auth_token");
        window.location = "/login";
    };

    const handleAdminLogout = () => {
        Cookies.remove("admin_auth_token");
        window.location = "/adminLogin";
    };

    // Only run on client side
    useEffect(() => {
        setIsClient(true); // Ensures that the component runs only after mounting
        setAuthToken(Cookies.get("auth_token"));
        setAdminAuthToken(Cookies.get("admin_auth_token"));
    }, []);

    if (!isClient) return null; // Avoid rendering on server side

    return (
        <>
            <div className="bg-black px-5 py-3 md:py-5 md:px-16 text-white">
                <div className="flex justify-between mb-2">
                    <Link href="/" className="text-3xl font-bold text-primary-light">Book My Hall</Link>
                    <button className="md:hidden" onClick={menu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    {(!authToken && !adminAuthToken) &&
                        <ul className="hidden md:flex flex-wrap gap-7 my-auto">
                            <li><Link href="/" className="bg-primary px-4 py-1.5 rounded hover:bg-black border border-primary border-2">Home</Link></li>
                            <li><Link href="/signup" className="bg-primary px-4 py-1.5 rounded hover:bg-black border border-primary border-2">SignUp</Link> </li>
                            <li><Link href="/login" className="bg-primary px-4 py-1.5 rounded hover:bg-black border border-primary border-2">LogIn</Link></li>
                        </ul>
                    }
                </div>
                <div className="hidden" ref={menubar}>
                    <ul className="md:hidden fixed top-0 right-0 h-[100vh] w-64 z-[999] bg-seconadary-light backdrop-blur-[10px] transition-right duration-500 ease-linear shadow-sm flex flex-col items-start justify-start ">
                        <li className="mt-5 w-[100%] px-7">
                            <Link href=" " className="text-white-500 py-1 px-2 rounded text-l font-bold">
                                <button onClick={menu}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </Link>
                        </li>
                        <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/" className="text-white-500 py-1 px-2 rounded text-l font-bold">Home</Link></li>
                        {authToken && (
                            <>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/profile" className="text-white-500 py-1 px-2 rounded text-l font-bold">Profile</Link> </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/venueList" className="text-white-500 py-1 px-2 rounded text-l font-bold">Search Venues</Link></li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light cursor-pointer" onClick={handleUserLogout}>User Log Out</li>
                            </>
                        )}
                        {adminAuthToken && (
                            <>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/admin" className="text-white-500 py-1 px-2 rounded text-l font-bold">Dashboard</Link> </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/admin" className="text-white-500 py-1 px-2 rounded text-l font-bold">Users</Link></li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/admin" className="text-white-500 py-1 px-2 rounded text-l font-bold">Bookings</Link></li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light cursor-pointer" onClick={handleAdminLogout}>Admin Log Out</li>
                            </>
                        )}
                        {(!adminAuthToken && !authToken) && (
                            <>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/signup" className="text-white-500 py-1 px-2 rounded text-l font-bold">SignUp</Link> </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light"><Link href="/login" className="text-white-500 py-1 px-2 rounded text-l font-bold">Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}
