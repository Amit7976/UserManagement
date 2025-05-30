"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { FaSearch } from "react-icons/fa";
import { LuFileUser } from "react-icons/lu";
import { toast } from "sonner";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


interface NewsLatterItem {
    _id: string;
    email: string;
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function MainContent() {

    const [newsLatter, setNewsLatter] = useState<NewsLatterItem[]>([]);
    const [filterText, setFilterText] = useState("");
    const [loading, setLoading] = useState(true);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        const fetchNewsLatter = async () => {
            try {
                const res = await axios.get("/api/newsletter");
                setNewsLatter(res.data.subscribers || []);
            } catch (err) {
                toast.error("Failed to fetch newsletter data");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNewsLatter();
    }, []);


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const filteredData = newsLatter.filter((item) =>
        item.email.toLowerCase().includes(filterText.toLowerCase()),
    );


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    const deleteData = async (id: string) => {
        try {
            setLoading(true);
            const res = await axios.delete(`/api/newsletter?id=${id}`);

            if (res.data.success) {
                toast.success("User deleted successfully");
                // Re-fetch updated list after deletion
                const updated = await axios.get("/api/newsletter");
                setNewsLatter(updated.data.subscribers || []);
            } else {
                toast.error(res.data.message || "Failed to delete user");
            }
        } catch (err) {
            toast.error("Error deleting user");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    return (
        <div className="p-8 pl-24 bg-slate-100 dark:bg-neutral-900 min-h-screen">
            <div className="pb-6">
                <h2 className="text-4xl font-bold text-gray-500">Subscribers</h2>
            </div>
           
            <div className="w-full">
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border border-gray-200 rounded-xl shadow-2xs overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
                              
                                <div className="px-6 py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-neutral-700">
                                  
                                    <div className="sm:col-span-1">
                                        <label htmlFor="hs-as-table-product-review-search" className="sr-only">Search</label>
                                        <div className="relative">
                                            <Input
                                                placeholder="Search by email..."
                                                value={filterText}
                                                onChange={(e) => setFilterText(e.target.value)}
                                                className="py-2 px-3 ps-11 block w-96 h-12 border-gray-500 rounded-lg text-sm border-2 focus-visible:ring-0 focus-visible:outline-0"
                                            />
                                            <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                                                <FaSearch />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="sm:col-span-2 md:grow">
                                        <div className="flex justify-end gap-x-2">
                                            <div className="hs-dropdown [--placement:bottom-right] relative inline-block">
                                                <CSVLink
                                                    data={filteredData.map((item) => ({ email: item.email }))}
                                                    filename="newsletter_emails.csv"
                                                    className="py-2.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                                                >
                                                    <LuFileUser />
                                                    Export
                                                </CSVLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead className="bg-gray-200 dark:bg-neutral-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                                        Email
                                                    </span>
                                                </div>
                                            </th>

                                            <th scope="col" className="px-6 py-3 text-start">
                                                <div className="flex items-center gap-x-2">
                                                    <span className="text-xs font-semibold uppercase text-gray-800 dark:text-neutral-200">
                                                        Delete
                                                    </span>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">

                                        {loading ? (
                                            <tr>
                                                <td colSpan={6} className="text-center">
                                                    Loading...
                                                </td>
                                            </tr>
                                        ) : filteredData.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="text-center text-gray-500">
                                                    No submissions found.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredData.map((item, i) => (
                                                <tr className="hover:bg-gray-50 dark:bg-neutral-900 dark:hover:bg-neutral-800" key={i}>
                                                    <td className="size-px whitespace-break-spaces align-middle px-20 py-4">
                                                        <a href={`mailto:${item.email}`} className="block text-sm text-gray-500 dark:text-neutral-500">{item.email}
                                                        </a>
                                                    </td>
                                                    <td className="size-px whitespace-break-spaces align-middle">
                                                        <Button onClick={() => deleteData(item._id)} className="cursor-pointer" variant={'destructive'}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>

                                            ))
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainContent;
