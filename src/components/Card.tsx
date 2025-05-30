import Image from 'next/image';
import { useState } from 'react';
import GetEmail from './GetEmail';


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import {
    Dialog,
    DialogTrigger
} from "@/components/ui/dialog";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface Event {
    title: string;
    location: string;
    date: string;
    image?: string;
    url: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function Card({ event }: { event: Event }) {


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [redirectLink, setRedirectLink] = useState('/');
    const [getEmail, setGetEmail] = useState(false);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className='rounded-3xl overflow-hidden p-6 bg-neutral-100 dark:bg-neutral-800 relative group cursor-pointer duration-500 hover:shadow-2xl hover:scale-105'>
                <div className='rounded-2xl h-60 relative overflow-hidden'>

                    <div className='z-10 absolute top-2 left-2 text-white dark:black'>
                        {(event.date === "Selling quickly") ? (
                            <p className='bg-blue-600 dark:bg-indigo-600 text-xs px-5 rounded py-1 border-0 border-neutral-700 font-medium shadow-xl'>
                                #Trending
                            </p>
                        ) : (event.date === "Nearly full") ? (
                            <p className='bg-orange-600 text-xs px-5 rounded py-1 border-0 border-neutral-700 font-medium shadow-xl'>
                                Almost Full
                            </p>
                        ) : (event.date === "Sales end soon") ? (
                            <p className='bg-amber-600 text-xs px-5 rounded py-1 border-0 border-neutral-700 font-medium shadow-xl'>
                                Sales end soon
                            </p>
                        ) : null}
                    </div>

                    <div className="overflow-hidden h-60">
                        {event.image && (
                            <Image
                                src={event.image}
                                alt={event.title}
                                width={800}
                                height={800}
                                className='size-full absolute top-0 start-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl select-none'
                            />
                        )}
                    </div>
                </div>
                <div className='pt-6 pb-0 space-y-3'>
                    <p className='text-2xl font-semibold inline-block'>
                        {event.title}
                    </p>
                    <p className='text-lg text-gray-500'>{event.location}</p>
                    <p className='text-base text-gray-500 dark:text-gray-300'>{event.date}</p>

                    <div className='opacity-0 group-hover:opacity-100 duration-700 h-full left-0 top-0 bg-black/40 w-full bottom-2 absolute flex items-center justify-center'>

                        <Dialog>
                            <DialogTrigger onClick={() => [setRedirectLink(event.url), setGetEmail(true)]} className='scale-0 group-hover:scale-100 cursor-pointer px-10 h-12 bg-white dark:bg-black rounded-lg font-semibold'>
                                Get Tickets
                            </DialogTrigger>
                            {getEmail && <GetEmail redirectLink={redirectLink} event={event} />}
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card