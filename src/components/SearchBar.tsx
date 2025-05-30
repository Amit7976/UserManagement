"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const searchSchema = z.object({
    country: z.string().min(2, "Country is required"),
    city: z.string().min(2, "City is required"),
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type SearchInput = z.infer<typeof searchSchema>;


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


interface SearchBarProps {
    setResult: (value: { events: Event[] }) => void;
    city: string;
    setCity: (val: string) => void;
    country: string;
    setCountry: (val: string) => void;
    setRsCity: (val: string) => void;
    setRsCountry: (val: string) => void;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface SearchInputForm {
    country: string;
    city: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function SearchBar({
    setResult,
    city,
    setCity,
    country,
    setCountry,
    setRsCity,
    setRsCountry
}: SearchBarProps) {

    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm<SearchInput>({
        resolver: zodResolver(searchSchema),
        defaultValues: {
            country,
            city,
        },
    });
    

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Watch for input changes and sync with parent state
    const watchedCountry: string = watch("country");
    const watchedCity: string = watch("city");


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        setCountry(watchedCountry);
    }, [watchedCountry, setCountry]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        setCity(watchedCity);
    }, [watchedCity, setCity]);

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    // Sync props to input fields if they change externally
    useEffect(() => {
        setValue("country", country);
    }, [country, setValue]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        setValue("city", city);
    }, [city, setValue]);

    
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    

    const onSubmit = async (data: SearchInputForm) => {
        setLoading(true);
        setResult({ events: [] });

        try {
            const res = await fetch(
                `/api/scrape?country=${encodeURIComponent(data.country)}&city=${encodeURIComponent(data.city)}`
            );
            const json = await res.json();

            // -------------------------------------------------------------------------------

            setRsCountry(watchedCountry);
            setRsCity(watchedCity);
            setResult(json);
        } catch (error) {
            console.error("Fetch error:", error);
        } finally {
            setLoading(false);
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            {loading ? (
                <div className="h-screen w-screen fixed top-0 left-0 z-40 bg-black/30 dark:bg-black/50 flex items-center justify-center select-none">
                    <Image src={'/images/gif/loader.gif'} width={200} height={200} alt="Loader" className="aspect-square w-20"></Image>
                </div>
            ) : null}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mx-auto max-w-2xl sm:flex sm:space-x-3 p-3 bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
                    <div className="w-full pb-2 sm:pb-0">
                        <Input
                            type="text"
                            {...register("country")}
                            className="py-2.5 outline-none sm:py-3 px-4 block w-full border-transparent rounded-lg sm:text-sm focus-visible:ring-0 focus-visible:border-0 shadow-none dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 focus:ring-0 dark:focus:ring-0"
                            placeholder="Country"
                        />
                        {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
                    </div>
                    <div className="pt-2 sm:pt-0 sm:ps-3 border-t border-gray-200 sm:border-t-0 sm:border-s w-full dark:border-neutral-700">
                        <Input
                            type="text"
                            {...register("city")}
                            className="py-2.5 outline-none sm:py-3 px-4 block w-full border-transparent rounded-lg sm:text-sm focus-visible:ring-0 focus-visible:border-0 shadow-none dark:bg-neutral-900 dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 focus:ring-0 dark:focus:ring-0"
                            placeholder="City"
                        />
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>
                    <div className="whitespace-nowrap pt-2 sm:pt-0 grid sm:block">
                        <Button
                            variant="default"
                            size="default"
                            type="submit"
                            className="bg-red-600 text-white hover:bg-red-700 px-8 py-2 cursor-pointer"
                            disabled={loading}
                        >
                            {loading ? "Searching..." : "Search"}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default SearchBar;
