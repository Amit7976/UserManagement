"use client";
import {DialogClose,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const schema = z.object({
    email: z.string().email("Enter a valid email address"),
});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type FormData = z.infer<typeof schema>;


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type Event = {
    title?: string;
    url?: string;
    image?: string;
    date?: string;
    location?: string;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function GetEmail({ redirectLink, event }: { redirectLink: string; event: Event }) {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange",
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const [loading, setLoading] = useState(false);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const onSubmit = async (data: FormData) => {
        setLoading(true);
        const payload = {
            email: data.email,
            title: event?.title,
            url: event?.url,
            image: event?.image,
            date: event?.date,
            location: event?.location,
        };

        try {
            const res = await fetch("/api/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // -------------------------------------------------------------------------------

            if (res.ok) {
                toast.info("Redirecting....");
                toast.success("Ticket request sent successfully!");
                router.push(redirectLink);
            } else {
                toast.error("Failed to send request.");
            }
        } catch (err) {
            console.error("Request failed:", err);
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-xl font-semibold">Share Email Address</DialogTitle>
                <DialogDescription className="font-normal text-base">
                    Share your email address which you want to get tickets.
                </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <div className="flex items-center space-x-2 my-4">
                    <div className="grid flex-1 gap-2">
                        <label htmlFor="email" className="sr-only">Email</label>
                        <Input
                            id="email"
                            placeholder="example@gmail.com"
                            className="focus-visible:outline-0 focus-visible:ring-0 h-12 border-2"
                            {...register("email")}
                            disabled={loading}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}
                    </div>
                </div>

                <DialogFooter className="sm:justify-start flex justify-between gap-2">
                    <DialogClose asChild className="flex-1 cursor-pointer">
                        <Button type="button" variant="secondary" disabled={loading}>
                            Close
                        </Button>
                    </DialogClose>

                    <Button type="submit" className="flex-1 cursor-pointer" disabled={!isValid || loading}>
                        {loading ? "Sending..." : "Get Tickets"}
                    </Button>
                </DialogFooter>
            </form>
        </DialogContent>
    );
}

export default GetEmail;
