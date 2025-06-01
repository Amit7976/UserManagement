"use client"
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const schema = z.object({
    _id: z.string().optional(),
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    username: z.string().optional(),
    phone: z.string().optional(),
    website: z.string().optional(),
    address: z.object({
        street: z.string().min(1, "Street is required"),
        suite: z.string().optional(),
        city: z.string().min(1, "City is required"),
        zipcode: z.string().min(1, "Zipcode is required"),
        geo: z.object({
            lat: z.string().optional(),
            lng: z.string().optional()
        }).optional()
    }),
    company: z.object({
        name: z.string().optional(),
        catchPhrase: z.string().optional(),
        bs: z.string().optional()
    }).optional()
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function EditUserDialog({ open, onOpenChange, user }: any) {
    const methods = useForm({
        resolver: zodResolver(schema),
        defaultValues: user
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    useEffect(() => {
        if (user) {
            methods.reset(user);
        }
    }, [user, methods]);
    const [step, setStep] = useState(1);
    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const router = useRouter();

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleSubmit = async (data: any) => {
        console.log('====================================');
        console.log("run");
        console.log('====================================');
        try {
            const res = await fetch("/api/users", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (!res.ok) throw new Error("Failed to update user");
            toast.success("User updated successfully!");
            onOpenChange(false);
            window.location.reload();

        } catch (err) {
            console.error(err);
            toast.error("Could not update user.");
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="mb-6">Edit User Details</DialogTitle>
                </DialogHeader>

                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleSubmit)} className="space-y-4">
                        {step === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Label className="col-span-1">Name</Label>
                                <Input className="h-12 col-span-2" {...methods.register("name")} placeholder="Name" />
                                
                                <Label className="col-span-1">Email Address</Label>
                                <Input className="h-12 col-span-2" {...methods.register("email")} placeholder="Email" />
                                
                                <Label className="col-span-1">UserName</Label>
                                <Input className="h-12 col-span-2" {...methods.register("username")} placeholder="Username" />
                                
                                <Label className="col-span-1">Phone Number</Label>
                                <Input className="h-12 col-span-2" {...methods.register("phone")} placeholder="Phone" />
                                
                                <Label className="col-span-1">Website</Label>
                                <Input className="h-12 col-span-2" {...methods.register("website")} placeholder="Website" />
                            </div>
                        )}

                        {step === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Label className="col-span-1">Street</Label>
                                <Input className="h-12 col-span-2" {...methods.register("address.street")} placeholder="Street" />
                                
                                <Label className="col-span-1">Suite</Label>
                                <Input className="h-12 col-span-2" {...methods.register("address.suite")} placeholder="Suite" />

                                <Label className="col-span-1">City</Label>
                                <Input className="h-12 col-span-2" {...methods.register("address.city")} placeholder="City" />

                                <Label className="col-span-1">Zipcode</Label>
                                <Input className="h-12 col-span-2" {...methods.register("address.zipcode")} placeholder="Zipcode" />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Label className="col-span-1">Company Name</Label>
                                <Input className="h-12 col-span-2" {...methods.register("company.name")} placeholder="Company Name" />

                                <Label className="col-span-1">Catch Phrase</Label>
                                <Input className="h-12 col-span-2" {...methods.register("company.catchPhrase")} placeholder="Catch Phrase" />

                                <Label className="col-span-1">BS</Label>
                                <Input className="h-12 col-span-2" {...methods.register("company.bs")} placeholder="BS" />
                            </div>
                        )}

                        <DialogFooter className="flex justify-between pt-4">
                            <div className="flex gap-2">
                                {step > 1 && <Button type="button" onClick={prevStep}>Back</Button>}
                                {step < 3 && <Button type="button" onClick={nextStep}>Next</Button>}
                            </div>
                            {step === 3 && <Button type="submit" onClick={() => console.log("save")}>Save</Button>}
                        </DialogFooter>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
}