import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { ModeToggle } from './ui/ModeToggle';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function DashboardHeader() {

    return (
        <>
            <div className="bg-transparent rounded-xl overflow-hidden">
                <div className="px-3 lg:px-6 py-4 grid gap-3 sm:flex sm:justify-between sm:items-center">
                    <div className="flex gap-4 items-center">
                        <h2 className="text-4xl font-bold text-black dark:text-white">Admin Penal</h2>
                    </div>
                    <div className="flex items-center mt-5 lg:mt-0 gap-x-10 gap-y-4 lg:gap-10 flex-wrap">
                        <Link href="/dashboard/add" className="group/button relative inline-flex items-center justify-center overflow-hidden rounded-md cursor-pointer bg-black backdrop-blur-lg px-6 py-2 h-10 text-base font-semibold text-white hover:bg-gray-300 hover:text-black transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-md hover:shadow-gray-600/50 border border-white/20">
                            <span className="text-sm flex items-center gap-2"> <FaPlus /> Add User</span>
                            <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
                                <div className="relative h-full w-10 bg-white/20"></div>
                            </div>
                        </Link>
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardHeader