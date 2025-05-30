"use client"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/ModeToggle";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { BsCalendar4Event } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function MainContent() {
   

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleLogout = async () => {
        if (confirm("Are you sure you want to Logout this account!")) {
            await signOut({ redirect: false });
            window.location.replace('/admin/auth/login');
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="p-4  pl-20  lg:px-4 lg:py-4 lg:pl-20 overflow-y-scroll h-screen bg-slate-100 dark:bg-neutral-800">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">
                            <div className="bg-transparent rounded-xl overflow-hidden">
                                <div className="px-3 lg:px-6 py-4 grid gap-3 sm:flex sm:justify-between sm:items-center">
                                    <div className="flex gap-4 items-center">
                                        <h2 className="text-4xl font-bold text-black dark:text-white">Admin Penal</h2>
                                    </div>
                                    <div className="flex items-center mt-5 lg:mt-0 gap-x-10 gap-y-4 lg:gap-10 flex-wrap">
                                        <Button
                                            onClick={handleLogout}
                                            className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md cursor-pointer bg-black backdrop-blur-lg px-6 py-2 h-10 text-base font-semibold text-white hover:text-black transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md hover:shadow-gray-600/50 border border-white/20"
                                        >

                                            <span className="text-sm flex items-center gap-2"> <PiSignOutBold /> Logout</span>
                                            <div
                                                className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]"
                                            >
                                                <div className="relative h-full w-10 bg-white/20"></div>
                                            </div>
                                        </Button>
                                        <ModeToggle />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-full mt-20 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
                                <Link href="/admin/event" className="w-full text-4xl text-center font-semibold py-20 px-10 rounded-lg bg-slate-200 dark:bg-neutral-900 hover:bg-slate-300 dark:hover:bg-neutral-700 duration-500 flex flex-col items-center justify-center min-h-40 gap-10">
                                    <BsCalendar4Event className="text-5xl" />

                                    Event Interested Persons
                                </Link>

                                <Link href="/admin/subscribe" className="w-full text-4xl text-center font-semibold py-20 px-10 rounded-lg bg-slate-200 dark:bg-neutral-900 hover:bg-slate-300 dark:hover:bg-neutral-700 duration-500 flex flex-col items-center justify-center min-h-40 gap-10">
                                    <IoPeopleOutline className="text-5xl" />
                                    Subscribers
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainContent