"use client"
import { Button } from '@/components/ui/button';
import { signOut } from "next-auth/react";
import Image from 'next/image';
import Link from 'next/link';
import { BsCalendar4Event } from "react-icons/bs";
import { IoPeopleOutline } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";
import { TbLayoutDashboard } from "react-icons/tb";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Sidebar() {


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
            <aside className="fixed top-0 left-0 flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 dark:bg-neutral-900 dark:border-neutral-700">
                <nav className="flex flex-col flex-1 space-y-6">
                    <Link href="/">
                        <Image className="w-auto h-full mx-auto" src="/images/electricIcon.svg" alt="" width={800} height={800} />
                    </Link>

                    <Link href="/admin" className="w-full text-2xl p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900">
                        <TbLayoutDashboard />
                    </Link>

                    <Link href="/admin/event" className="w-full text-2xl p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900">
                        <BsCalendar4Event />
                    </Link>

                    <Link href="/admin/subscribe" className="w-full text-2xl p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900">
                        <IoPeopleOutline />
                    </Link>
                </nav>

                <div className="flex flex-col space-y-6">
                    <Button onClick={handleLogout} className='cursor-pointer'>
                        <PiSignOutBold />
                    </Button>
                </div>
            </aside>
        </>
    )
}

export default Sidebar