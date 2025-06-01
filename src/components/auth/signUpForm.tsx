"use client";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { credentialsSignUp } from "./actions/register";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { Button } from "../ui/button";
import { Input } from "../ui/input";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const SignUpSchema = z.object({
    name: z.string().min(3, "Name is required"),
    email: z.string().email("Invalid email").min(10, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().min(10, "Phone number is required"),
});


const SignUpForm = () => {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSubmit = async () => {
        const form = formRef.current;
        if (!form) return;

        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const phoneNumber = formData.get("phoneNumber") as string;

        // Check for empty fields
        if (!name || !email || !password || !phoneNumber) {
            toast.error("All fields are required");
            return;
        }

        // Zod validation
        const result = SignUpSchema.safeParse({ name, email, password, phoneNumber });

        if (!result.success) {
            result.error.errors.forEach((error) => toast.error(error.message));
            return;
        }

        // Call registration logic
        const registrationResult = await credentialsSignUp(name, phoneNumber, email, password);

        if (registrationResult === undefined) {
            toast.success("Register success 🎉");
            router.replace('/auth/login');
        } else {
            toast.error("Registration failed ❌");
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <form
            ref={formRef}
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="mt-10"
        >
            <div className="space-y-5">
                <div className="w-full py-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium text-gray-500 pl-5">Name</label>
                        <Input
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            autoComplete="name"
                            required
                            className="border-2 rounded-full px-10 h-14 text-sm font-semibold placeholder:text-gray-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="phoneNumber" className="text-sm font-medium text-gray-500 pl-5">Phone Number</label>
                        <Input
                            name="phoneNumber"
                            type="text"
                            placeholder="Admin Phone Number"
                            autoComplete="tel"
                            required
                            className="border-2 rounded-full px-10 h-14 text-sm font-semibold placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-500 pl-5">Email address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-5 text-gray-400 pointer-events-none">
                            <MdAlternateEmail className="w-5 h-5" />
                        </div>
                        <Input
                            name="email"
                            type="email"
                            placeholder="Enter your email address"
                            autoComplete="email"
                            required
                            className="border-2 rounded-full px-12 h-14 text-sm font-semibold placeholder:text-gray-400"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-500 pl-5">Password</label>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        className="border-2 rounded-full px-10 h-14 text-sm font-semibold placeholder:text-gray-400"
                    />
                </div>

                <div className="flex justify-center pt-4">
                    <Button
                        type="submit"
                        className="flex items-center justify-center gap-3 rounded-xl px-10 w-full h-14 text-sm bg-[#FC4C01] hover:shadow-lg transition duration-300 cursor-pointer"
                    >
                        Sign up your Blog Account
                        <FaArrowRightLong className="text-xl" />
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default SignUpForm;
