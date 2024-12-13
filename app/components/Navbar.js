"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";

export default function Navbar() {

    const [isClient, setIsClient] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [adminAuthToken, setAdminAuthToken] = useState(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };


    const handleUserLogout = () => {
        Cookies.remove("auth_token");
        window.location = "/login";
    };

    const handleAdminLogout = () => {
        Cookies.remove("admin_auth_token");
        window.location = "/adminLogin";
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isMenuOpen && !event.target.closest("#mobile-menu")) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [isMenuOpen]);

    useEffect(() => {
        setIsClient(true);
        setAuthToken(Cookies.get("auth_token"));
        setAdminAuthToken(Cookies.get("admin_auth_token"));
    }, []);

    if (!isClient) return null;

    return (
        <>
            <div className="bg-black px-5 py-3 md:py-5 md:px-16 text-white">
                <div className="flex justify-between mb-2">
                    <Link href="/" className="text-3xl font-bold text-primary-light">Book My Hall</Link>
                    <button className="md:hidden" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex flex-wrap gap-7 my-auto">


                        {/* User Navigation */}
                        {authToken && !adminAuthToken && (
                            <>
                                <li><Link href="/" className="bg-primary px-4 py-1.5 rounded hover:bg-black border-primary border-2">Home</Link></li>
                                <li><Link href="/venueList" className="bg-primary px-4 py-1.5 rounded hover:bg-black border-primary border-2">Venues</Link></li>
                                <li><Link href="/profile" className="bg-primary px-4 py-1.5 rounded hover:bg-black border-primary border-2">Profile</Link></li>
                                <li><span onClick={handleUserLogout} className="bg-primary px-4 py-1.5 rounded hover:bg-black border-primary border-2">Logout</span></li>

                            </>
                        )}

                        {/* Admin Navigation */}
                        {adminAuthToken && (
                            <>
                                <li><span onClick={handleAdminLogout} className="bg-primary px-4 py-1.5 rounded hover:bg-black border-primary border-2">Logout</span></li>
                            </>
                        )}

                        {/* Guest Navigation */}
                        {(!authToken && !adminAuthToken) && (
                            <>
                                <li><Link href="/" className="bg-primary px-4 py-1.5 rounded hover:bg-black border border-primary border-2">Home</Link></li>
                                <li><Link href="/signup" className="bg-primary px-4 py-1.5 rounded hover:bg-black border border-primary border-2">SignUp</Link></li>
                                <li><Link href="/login" className="bg-primary px-4 py-1.5 rounded hover:bg-black border border-primary border-2">Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>

                {/* Mobile Navigation (Sidebar) */}
                <div>
                    <ul id="mobile-menu"
                        className={`fixed top-0 right-0 h-full w-64 z-[999] bg-seconadary-light transition-transform duration-500 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                            }`}>
                        <li className="mt-5 w-[100%] px-7">
                            <button onClick={toggleMenu} className="text-white-500 py-1 px-2 rounded text-l font-bold">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                        <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                            <Link href="/" className="text-white-500 py-1 px-2 rounded text-l font-bold">Home</Link>
                        </li>

                        {/* User Navigation */}
                        {authToken && !adminAuthToken && (
                            <>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/profile" className="text-white-500 py-1 px-2 rounded text-l font-bold">Profile</Link>
                                </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/venueList" className="text-white-500 py-1 px-2 rounded text-l font-bold">Venues</Link>
                                </li>
                                <li
                                    className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light cursor-pointer"
                                    onClick={handleUserLogout}
                                >
                                    <span className="text-white-500 py-1 px-2 rounded text-l font-bold">Logout</span>
                                </li>
                            </>
                        )}

                        {/* Admin Navigation */}
                        {adminAuthToken && (
                            <>
                                {/* <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/admin" className="text-white-500 py-1 px-2 rounded text-l font-bold">Dashboard</Link>
                                </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/admin/users" className="text-white-500 py-1 px-2 rounded text-l font-bold">Users</Link>
                                </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/admin/bookings" className="text-white-500 py-1 px-2 rounded text-l font-bold">Bookings</Link>
                                </li> */}
                                <li
                                    className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light cursor-pointer"
                                    onClick={handleAdminLogout}
                                >
                                    <span className="text-white-500 py-1 px-2 rounded text-l font-bold">Logout</span>
                                </li>
                            </>
                        )}

                        {/* Guest Navigation */}
                        {(!adminAuthToken && !authToken) && (
                            <>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/signup" className="text-white-500 py-1 px-2 rounded text-l font-bold">SignUp</Link>
                                </li>
                                <li className="my-1 w-[100%] py-4 px-7 hover:bg-primary-light">
                                    <Link href="/login" className="text-white-500 py-1 px-2 rounded text-l font-bold">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
}