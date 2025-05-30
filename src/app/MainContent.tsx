"use client";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type Event = {
    title: string;
    url: string;
    image: string;
    date: string;
    location: string;
    price: string;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function MainContent({
    result,
    rsCity,
    rsCountry
}: {
    result: { events: Event[] };
    rsCity: string;
    rsCountry: string;
}) {
    const [events, setEvents] = useState<Event[]>([]);
    const [page, setPage] = useState(6);
    const [loading, setLoading] = useState(false);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Load initial events from prop once
    useEffect(() => {
        if (result?.events?.length) {
            setEvents(result.events);
        }
    }, [result]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const loadMore = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `/api/scrape?country=${encodeURIComponent(rsCountry)}&city=${encodeURIComponent(rsCity)}&page=${page}`
            );
            const json = await res.json();

            if (json?.events?.length) {
                setEvents((prev) => [...prev, ...json.events]);
                setPage((prev) => prev + 5);
            }
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    if (!events.length) return null;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <main className="p-5 lg:p-10">
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-500 sm:-mb-10">All Event of</p>
                <h2 className="capitalize font-semibold text-red-500 text-[20vw]">{rsCity}</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 lg:mt-20">
                    {events.map((event: Event, i: number) => (
                        <Card event={event} key={i} />
                    ))}
                </div>

                <div className="w-full flex justify-center mt-20 lg:mt-40">
                    {events.length < 100 ? null : (
                        <Button
                            onClick={loadMore}
                            disabled={loading}
                            className="w-full max-w-7xl h-16 font-semibold text-lg cursor-pointer bg-neutral-700 dark:bg-neutral-300 hover:bg-neutral-900 dark:hover:bg-white hover:shadow-2xl duration-300"
                        >
                            {loading ? "Loading..." : "Load More"}
                        </Button>
                    )}
                </div>
            </main>
            
        </>
    );
}
