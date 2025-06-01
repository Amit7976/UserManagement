import SignUpForm from '@/components/auth/signUpForm'
import { FaAnglesRight } from 'react-icons/fa6'


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const MainContent = async () => {

    return (
        <>
            <section className="bg-white dark:bg-neutral-900 min-h-screen flex items-center justify-center flex-col">
                <div className="w-2xl">
                    <h2 className="text-3xl font-bold leading-tight text-gray-400 sm:text-4xl flex flex-col gap-2"><span className='pl-3'>Register new</span><span className='text-6xl text-black dark:text-white'>Admin</span></h2>
                    <SignUpForm />
                    <div className='w-full py-6 flex justify-center-center gap-5'>
                        <p className='w-full text-center mt-4 text-gray-400'><a href="/auth/login" className='font-medium text-base justify-center flex items-center'>Already have a account<span className='font-bold text-orange-500 px-1 underline underline-offset-2 flex items-center gap-0.5 hover:text-gray-500 duration-500'>Login Now <FaAnglesRight className='text-' /></span></a></p>
                    </div>
                </div>
            </section>

        </>
    )
}

export default MainContent