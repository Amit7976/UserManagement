"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const SecretGate = ({ children }: { children: React.ReactNode }) => {
    const [unlocked, setUnlocked] = useState(false);
    const [keyInput, setKeyInput] = useState("");


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const handleUnlock = () => {
        const secret = process.env.NEXT_PUBLIC_ADMIN_REGISTER_UNLOCK_SECRET_KEY;
      
        if (keyInput === secret) {
            setUnlocked(true);
            toast.success("Unlocked 🚪");
        } else {
            toast.error("Wrong secret key ❌");
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (unlocked) return <>{children}</>;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-neutral-900 px-4">
            <h2 className="text-2xl font-bold mb-4">Enter Secret Key</h2>
            <Input
                type="password"
                placeholder="Secret Key"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                className="mb-3 max-w-sm"
            />
            <Button onClick={handleUnlock} className="px-10 cursor-pointer">Unlock</Button>
        </div>
    );
};

export default SecretGate;
