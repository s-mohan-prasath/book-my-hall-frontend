"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../styles/signup.login.css';

export default function SignIn() {
    const router = useRouter();
    async function makeSignUp(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phoneNumber = document.getElementById('phoneNumber').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('cpassword').value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            let response = await fetch('http://localhost:5000/auth/signup', {
                method: "POST",
                body: JSON.stringify({
                    name, email, password, phoneNumber
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                let data = await response.json();
                let token = data.token;
                document.cookie = `auth_token=${token}; path=/; max-age=${24 * 60 * 60}`;
                sessionStorage.setItem("user", JSON.stringify(data?.user))
                window.location.href = "/venueList"
            }
            const data = await response.json();
            if (data.error == "User Already Exists") {
                document.getElementById('error').textContent = "User Already Exists";
                document.getElementById('error').style.marginBottom = "12px";
            }
            if (data.error) {
                document.getElementById('error').textContent = "Please enter valid details ";
                document.getElementById('error').style.marginBottom = "12px";
            }
            if (!data.error) {
                document.cookie = data.token;
            }
            console.log(data);
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <form action="" onSubmit={makeSignUp} className="shadow-custom w-80 md:w-96 bg-primary-sign my-[10vh] mx-auto rounded-md p-8">
            <h1 className='text-primary mb-8 text-3xl font-bold'>Sign Up</h1>
            <div className="flex flex-col gap-5 relative custom">
                <input className=' border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px] ' type="text" id="name" name="name" placeholder="" required />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="name">Name</label>
                <div className="text-center h-5 text-xl"></div>
            </div>
            <div className="flex flex-col gap-5 relative custom">
                <input className='border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px]  ' type="email" id="email" name="email" placeholder="" required />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="email">Instutional Email</label>
                <div className="text-center h-5 text-xl"></div>
            </div >
            <div className="flex flex-col gap-5 relative custom">
                <input className='border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px]  ' type="text" id="phoneNumber" name="phoneNumber" placeholder="" required />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="phoneNumber">Mobile Number</label>
                <div className="text-center h-5 text-xl"></div>
            </div >
            <div className="flex flex-col gap-5 relative custom">
                <input className='border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px]  ' type="password" id="password" name="password" placeholder="" required />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="password">Enter Password</label>
                <div className="text-center h-5 text-xl"></div>
            </div >
            <div className="flex flex-col gap-5 relative custom">
                <input className='border-0 border-b-2 [border-color:#222222] w-full h-9 bg-transparent text-seconadary focus:outline-none text-s[15px]  ' type="password" id="cpassword" name="cpassword" placeholder="" required />
                <label className='absolute left-0 top-0 transition-all duration-300 ' htmlFor="cpassword">Confirm Password</label>
                <div className="text-center h-5 text-base text-primary" id='error'></div>
            </div >
            <div className="flex justify-between items-center text-seconadary ">
                <label className='flex items-center' htmlFor="remember">
                    <input type="checkbox" id="remember" />
                    <p className='my-0 mx-1'>Remember me</p>
                </label>
            </div >
            <button className='w-full bg-primary text-white text-base font-medium rounded-md border-none p-2 mt-[10%] mb-[5%] cursor-pointer transition-all duration-300 ease-linear hover:bg-primary-dark' type="submit">Sign Up</button>
            <div className="account" >
                <p>Have an account? {" "} <Link className='text-primary underline' href={"/login"}> Sign In</Link></p>
            </div >
        </form >
    );
}
