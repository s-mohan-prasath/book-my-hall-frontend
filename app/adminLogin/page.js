"use client";
import Link from 'next/link';
import '../styles/signup.login.css';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const router = useRouter();
    async function handleAdminLogin(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            let response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/auth/signin`, {
                method: "POST",
                body: JSON.stringify({
                    email, password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                let data = await response.json();
                let token = data.token;
                document.cookie = `admin_auth_token=${token}; path=/; max-age=${24 * 60 * 60}`;
                sessionStorage.setItem("admin_user", JSON.stringify(data?.admin_user))
                window.location.href = "/admin"
            }
            else {
                alert("Invalid Admin Credential");
                document.getElementById('error').innerText = "Invalid Admin Credential";
                document.getElementById('error').style.marginBottom = "12px";
            }

        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <form action="" onSubmit={handleAdminLogin} className="shadow-custom w-80 md:w-96 border-2 border-primary bg-primary-sign my-[10vh] mx-auto rounded-md p-8">
            <h1 className='text-primary mb-8 text-3xl font-bold'>Admin Login</h1>
            <div className="flex flex-col gap-5 relative custom">
                <input className='border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px] ' type="email" id="email" name="email" placeholder="" />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="email">Organization Email</label>
                <div className="text-center h-5 text-xl"></div>
            </div>
            <div className="flex flex-col gap-5 relative custom">
                <input className='border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px] ' type="password" id="password" name="password" placeholder="" />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="password">Password</label>
                <div className="text-center h-5 text-base text-primary" id='error'></div>
            </div>
            <button className='w-full bg-primary text-white text-base font-medium rounded-md border-none p-2 mt-[5%] mb-[5%] cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-dark' type="submit">Log In</button>

        </form >
    )
}