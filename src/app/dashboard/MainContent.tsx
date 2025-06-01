"use client"
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import UserCard from "@/components/UserCard";
import UserTable from "@/components/UserTable";
import { User } from "@/lib/types/user";
import exportToCSV from "@/utils/exportToCSV";
import exportToJSON from "@/utils/exportToJSON";
import { useEffect, useState } from "react";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function MainContent() {


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "card">(() => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("DataView");
            return stored === "card" || stored === "table" ? stored : "table";
        }
        return "table";
    });


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
              
                const [placeholderRes, localRes] = await Promise.all([
                    fetch("https://jsonplaceholder.typicode.com/users"),
                    fetch("/api/users")
                ]);

                if (!placeholderRes.ok || !localRes.ok) {
                    throw new Error("Failed to fetch users from one or both sources");
                }

                const placeholderData: User[] = await placeholderRes.json();
                const { users: localUsers, removeUser } = await localRes.json();
                
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                const removedIds: number[] = removeUser.map((r: { id: number }) => r.id);
                
                const filteredPlaceholder = placeholderData.filter(
                    (user) => !removedIds.includes(user.id)
                );
               
                ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                const mergedData = [...localUsers, ...filteredPlaceholder];

                setUsers(mergedData);
                setFilteredUsers(mergedData);
                setLoading(false);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        const term = searchTerm.toLowerCase();
        const filtered = users.filter(
            (user) =>
                user.name.toLowerCase().includes(term) ||
                user.address.city.toLowerCase().includes(term)
        );
        setFilteredUsers(filtered);
    }, [searchTerm, users]);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const toggleView = () => {
        setViewMode((prev) => {
            const newView = prev === "table" ? "card" : "table";
            localStorage.setItem("DataView", newView);
            return newView;
        });
    };

  
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (loading) return <div className="p-4 pl-20  lg:px-4 lg:py-4 lg:pl-20 overflow-y-scroll h-screen bg-slate-200 dark:bg-neutral-900">
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="w-full h-screen" />
    </div>;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <>
            <div className="p-4  pl-20  lg:px-4 lg:py-4 lg:pl-20 overflow-y-scroll h-screen bg-slate-100 dark:bg-neutral-800">
                <div className="flex flex-col">
                    <div className="overflow-x-auto">
                        <div className="min-w-full inline-block align-middle">

                            <DashboardHeader />


                            <div className="sm:p-6 space-y-4 min-h-screen w-[93vw]">

                                <div className="flex justify-between items-center flex-col sm:flex-row gap-4 pb-4">
                                    <Input
                                        placeholder="Search by name or city..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="max-w-md h-12 border-2"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant={'default'}
                                            onClick={() => exportToCSV(filteredUsers)}
                                            className="px-5 h-10 bg-gray-400 dark:bg-neutral-600 text-white rounded-sm hover:bg-gray-500 dark:hover:bg-neutral-500 cursor-pointer transition-all text-xs"
                                        >
                                            Export CSV
                                        </Button>
                                        <Button
                                            variant={'default'}
                                            onClick={() => exportToJSON(filteredUsers)}
                                            className="px-5 h-10 bg-gray-400 dark:bg-neutral-600 text-white rounded-sm hover:bg-gray-500 dark:hover:bg-neutral-500 cursor-pointer transition-all text-xs"
                                        >
                                            Export JSON
                                        </Button>

                                        <Button
                                            variant={'default'}
                                            onClick={toggleView}
                                            className="px-5 h-10 bg-orange-600 text-white rounded-sm hover:bg-orange-700 cursor-pointer transition-all text-xs"
                                        >
                                            {viewMode === "table" ? "Card" : "Table"} View
                                        </Button>
                                    </div>

                                </div>

                                {viewMode === "table" ? (
                                    <UserTable filteredUsers={filteredUsers} setUsers={setUsers} />

                                ) : (
                                    // ✅ Card View
                                    <UserCard filteredUsers={filteredUsers} setUsers={setUsers} />
                                )}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainContent