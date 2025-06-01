"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserFormData, userSchema } from "@/lib/types/formSchema";
import { fetchLocationDetails } from "@/utils/fetchLocationDetails";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleLeft, FaAngleRight, FaLeftLong } from "react-icons/fa6";
import { toast } from "sonner";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const LeafletMap = dynamic(() => import("@/components/LeafletMap"), { ssr: false });


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function MainContent() {

    const [step, setStep] = useState(0);
    const [mapOpen, setMapOpen] = useState(false);
    const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const {
        register,
        handleSubmit,
        setValue,
        trigger,
        watch,
        formState: { errors },
        getValues,
        reset,
    } = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        mode: "onTouched",
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const nextStep = async () => {
        let fieldsToValidate: (keyof UserFormData)[] = [];
        if (step === 0) fieldsToValidate = ["name", "email"];
        else if (step === 1) fieldsToValidate = ["address"];
        else if (step === 2) fieldsToValidate = ["company"];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const onSubmit = async (data: UserFormData) => {
        try {
            const response = await axios.post("/api/users", data);
            console.log("User added:", response.data);
            toast.success("User added successfully!");
            reset();
            setMarker(null);
            setMapOpen(false);
            setStep(0);
            localStorage.removeItem("user-form");;

        } catch (error) {
            console.error("Failed to add user:", error);
            toast.error("Failed to add user. Check console for details.");
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleMapClick = (lat: number, lng: number) => {
        setMarker({ lat, lng });
        fetchLocationDetails(lat, lng, setValue);
        setMapOpen(false);
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        const saved = localStorage.getItem("user-form");
        if (saved) {
            const parsed = JSON.parse(saved);
            reset(parsed);
        }
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        const subscription = watch((value) => {
            localStorage.setItem("user-form", JSON.stringify(value));
        });
        return () => subscription.unsubscribe();
    }, [watch]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const router = useRouter();


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className="p-12 grid grid-cols-5 gap-1">
            <div className="col-span-5 lg:col-span-2">
                <p className="text-lg flex items-center gap-2 border-2 border-transparent hover:border-gray-500 cursor-pointer w-fit px-4 py-2 rounded-lg" onClick={() => router.replace('/dashboard')}><FaLeftLong /> Back</p>
                <h2 className="text-8xl font-bold mb-4"><span className="text-5xl">Add</span> <br /> New User</h2>
            </div>
            <div className="col-span-5 lg:col-span-3 bg-slate-100 dark:bg-neutral-800 p-10 rounded-2xl">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                    {step === 0 && (
                        <>
                            <Label className="text-lg text-gray-600 dark:text-gray-400">UserName</Label>
                            <Input className="h-12 border-2" placeholder="UserName" {...register("username")} />
                            {errors.username && <p className="text-red-600">{errors.username.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Name</Label>
                            <Input className="h-12 border-2" placeholder="Name" {...register("name")} />
                            {errors.name && <p className="text-red-600">{errors.name.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Email</Label>
                            <Input className="h-12 border-2" placeholder="Email" type="email" {...register("email")} />
                            {errors.email && <p className="text-red-600">{errors.email.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Phone Number</Label>
                            <Input className="h-12 border-2" placeholder="Phone Number" type="phone" {...register("phone")} />
                            {errors.phone && <p className="text-red-600">{errors.phone.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Website</Label>
                            <Input className="h-12 border-2" placeholder="Website" type="website" {...register("website")} />
                            {errors.website && <p className="text-red-600">{errors.website.message}</p>}
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Street</Label>
                            <Input className="h-12 border-2" placeholder="Street" {...register("address.street")} />
                            {errors.address?.street && <p className="text-red-600">{errors.address.street.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Suite</Label>
                            <Input className="h-12 border-2" placeholder="Suite" {...register("address.suite")} />
                            {errors.address?.suite && <p className="text-red-600">{errors.address.suite.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">City</Label>
                            <Input className="h-12 border-2" placeholder="City" {...register("address.city")} />
                            {errors.address?.city && <p className="text-red-600">{errors.address.city.message}</p>}

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Zipcode</Label>
                            <Input className="h-12 border-2" placeholder="Zipcode" {...register("address.zipcode")} />
                            {errors.address?.zipcode && <p className="text-red-600">{errors.address.zipcode.message}</p>}

                            <Button type="button" onClick={() => setMapOpen(true)}>
                                Pick Location from Map
                            </Button>
                            {marker && (
                                <p className="text-sm mt-1 text-gray-700 dark:text-gray-600">
                                    Selected: {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
                                </p>
                            )}
                            <Input className="h-12 border-2" placeholder="" type="hidden" {...register("address.geo.lat")} />
                            <Input className="h-12 border-2" placeholder="" type="hidden" {...register("address.geo.lng")} />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Company Name</Label>
                            <Input className="h-12 border-2" placeholder="Company Name" {...register("company.name")} />

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">Catch Phrase</Label>
                            <Input className="h-12 border-2" placeholder="Catch Phrase" {...register("company.catchPhrase")} />

                            <Label className="text-lg mt-6 text-gray-600 dark:text-gray-400">BS</Label>
                            <Input className="h-12 border-2" placeholder="BS" {...register("company.bs")} />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h3 className="text-lg font-semibold mt-4">Review & Confirm</h3>
                            <pre className="bg-gray-100 text-black p-4 rounded text-sm">
                                {JSON.stringify(getValues(), null, 2)}
                            </pre>
                        </>
                    )}

                    <div className="flex justify-between pt-10 gap-10">
                        {step > 0 && <Button type="button" variant={'default'} className="h-12 flex-1 cursor-pointer" onClick={prevStep}><FaAngleLeft /> Back</Button>}

                        {step < 3 && (
                            <Button type="button" variant={'default'} className="h-12 flex-1 cursor-pointer" onClick={nextStep}>Next <FaAngleRight /> </Button>
                        )}

                        {step === 3 && <Button type="submit" variant={'default'} className="h-12 flex-1 cursor-pointer">Submit</Button>}
                    </div>
                </form>

                <Dialog open={mapOpen} onOpenChange={setMapOpen}>
                    <DialogHeader className="hidden">
                        <DialogTitle>
                            Select a Location
                        </DialogTitle>
                    </DialogHeader>
                    <DialogContent className="w-[90vw] h-[70vh]">
                        <LeafletMap
                            initialPosition={[marker?.lat || 20.5937, marker?.lng || 78.9629]}
                            onSelect={handleMapClick}
                            marker={marker}
                        />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}