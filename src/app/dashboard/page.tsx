import Sidebar from '@/components/Sidebar';
import MainContent from './MainContent';
import { auth } from '@/nextAuth/auth';
import { redirect } from 'next/navigation';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const page = async () => {


    const session = await auth();
    if (!session?.user) {
        redirect("/auth/login")
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div className="grid grid-cols-12 bg-white dark:bg-neutral-800 relative">
                <div className="col-span-12">
                    <Sidebar />
                    <MainContent />
                </div>
            </div>
        </>
    );
}
export default page;