"use client"
import Image from "next/image";
import './styles/home.css'
export default function Home() {
    return (
        <main>
            <div>
                <Image className="relative brightness-50"
                    src="/images/bg.jpg"
                    alt="Sample Image"
                    width={612}
                    height={335}
                    layout="responsive"
                    style={{ maxWidth: '100%', maxHeight: '70.2vh' }}
                />
                <div className="hero">&quot; Lets Make Your Next Event <span className="hero-span text-white">Extraordinary!</span> &quot;</div>
            </div>
            <div className=" sm:px-8 py-8 ">
                <div className=" p-10 md:p-0  md:w-[80%] items-center  mx-auto">
                    <h2 className="text-3xl text-primary font-semibold mb-6 text-center  ">Our Key Features</h2>
                    <p className=" md:pb-10">Explore the key features that make our service stand out. From advance bookings to hassle-free venue management and a comprehensive event calendar, we have got you covered.</p>
                </div>
                <div className="flex flex-col flex-wrap justify-around gap-5">
                    <div className="flex flex-col gap-6 md:flex-row p-10 md:p-4 text-white rounded-lg shadow-[0 2px 5px rgba(0, 0, 0, 0.1)] flex-col  md:w-[80%] items-center transition-all transform duration-300 ease-linear hover:transform-[scale(1.05)] mx-auto  border-2 rounded-lg shadow-lg hover:shadow-xl" >
                        <img className="w-72 h-60 md:flex-shrink-0 md:w-80 object-cover rounded-lg md:mx-0 " src='images/f1.jpg' alt='feature-image' />
                        <div class="flex flex-col gap-5 flex-wrap">
                            <h3 className="text-3xl text-primary px-5 my-auto flex-shrink font-semibold text-center md:text-start">Advance Booking</h3>
                            <p className="text text-black "> Secure your preferred venue well in advance with our simple and efficient booking system. Avoid last-minute hassles and ensure everything is set for your special occasion.</p>
                        </div>
                    </div>
                    <div className="flex flex-col  gap-6 md:flex-row-reverse p-10  md:p-4 text-white rounded-lg shadow-[0 2px 5px rgba(0, 0, 0, 0.1)] flex-col  md:w-[80%] items-center transition-all transform duration-300 ease-linear hover:transform-[scale(1.05)] mx-auto  border-2 rounded-lg shadow-lg hover:shadow-xl" >
                        <img className="w-72 h-60 md:flex-shrink-0 md:w-80 object-cover rounded-lg md:mx-0 " src='images/f2.jpg' alt='feature-image' />
                        <div class="flex flex-col gap-5 flex-wrap">
                            <h3 className="text-3xl text-primary px-5 my-auto flex-shrink font-semibold text-center md:text-start">Hassle Free Venue Management </h3>
                            <p className="text text-black px-5"> Our platform provides seamless venue management, allowing you to coordinate with ease. Manage bookings, view availability, and handle all details effortlessly.</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-6 md:flex-row p-10 md:p-4 text-white rounded-lg shadow-[0 2px 5px rgba(0, 0, 0, 0.1)] flex-col  md:w-[80%] items-center transition-all transform duration-300 ease-linear hover:transform-[scale(1.05)] mx-auto  border-2 rounded-lg shadow-lg hover:shadow-xl" >
                        <img className="w-72 h-60 md:flex-shrink-0 md:w-80 object-cover rounded-lg  md:mx-0 " src='images/f3.jpg' alt='feature-image' />
                        <div class="flex flex-col gap-5 flex-wrap">
                            <h3 className="text-3xl text-primary px-5 my-auto flex-shrink font-semibold text-center md:text-start">Event Calendar</h3>
                            <p className="text text-black px-5"> Keep track of all your events with our comprehensive event calendar. View upcoming events, important dates, and manage your schedule effectively.</p>
                        </div>
                    </div>
                </div>
            </div>
        </main >
    );
}