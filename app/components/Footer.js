"use client"
import Link from "next/link"
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutubeSquare } from "react-icons/fa";
import "../styles/Footer.css"

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-left">
                    <h1 className="footer-title">Book My Hall</h1>
                    <p className="footer-description">Easiest Way to Secure Your Event Space!</p>
                    {/* Find, Book, and Celebrate with Ease / Seamless Venue Booking for Every Event*/}
                    <div className="footer-social">
                        <Link href="/" aria-label="LinkedIn">
                            <FaLinkedin size={24} color={"#cf1839"} />
                        </Link>
                        <Link href="/" aria-label="Instagram">
                            <FaInstagram size={24} color={"#cf1839"} />
                        </Link>
                        <Link href="/" aria-label="YouTube">
                            <FaYoutubeSquare size={24} color={"#cf1839"} />
                        </Link>
                    </div>
                </div>
                <div className="footer-right">
                    <ul className="footer-sitemap-list">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/venueList">Venues</Link></li>
                        <li><Link href="/signup">SignUp</Link></li>
                        <li><Link href="/login">LogIn</Link></li>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="footer-copyright">&copy; 2024 Book My Hall. All rights reserved.</p>
            </div>
        </footer>
    )
}
