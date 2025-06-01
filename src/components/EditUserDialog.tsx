"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserFormData, userSchema } from "@/lib/types/formSchema";
import { User } from "@/lib/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "./ui/label";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default function EditUserDialog({ open, onOpenChange, user }: { open: boolean; onOpenChange: (open: boolean) => void; user: User }) {

    const methods = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            ...user,
            _id: (user._id ?? user.id ?? "").toString(),
        }
    });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (user) {
            methods.reset({ ...user, _id: (user._id ?? user.id)?.toString() ?? "" });
        }
    }, [user, methods]);
    const [step, setStep] = useState(1);
    const nextStep = () => setStep((s) => s + 1);
    const prevStep = () => setStep((s) => s - 1);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleSubmit = async (data: UserFormData) => {
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