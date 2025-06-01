"use client"
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import AnimatedRow from "./AnimatedRow";
import EditUserDialog from "./EditUserDialog";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function UserTable({ filteredUsers, setUsers }: any) {
    const [selectedUserId, setSelectedUserId] = useState<number | string | null>(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const handleDelete = async (id: number | string) => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;


        try {
            const res = await fetch(`/api/users`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) {
                throw new Error("Failed to delete user");
            }

            const updatedUsers = filteredUsers.filter((u: any) => (u.id || u._id) !== id);
            setUsers(updatedUsers);
            setSelectedUserId(null);
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete user. Check console for details.");
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleEditClick = (user: any) => {
        setEditData({ ...user });
        setIsDialogOpen(true);
    };


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <div className="max-w-full overflow-x-auto border rounded-lg">
                <table className="min-w-max text-left border-collapse border border-gray-300 text-sm">
                    <thead className="bg-gray-100 dark:bg-gray-800 sticky top-0 z-10">
                        <tr>
                            <th className="border py-3 pl-4 pr-2 w-10">Sr.</th>
                            <th className="border py-3 px-2 w-40">Name</th>
                            <th className="border py-3 px-2 w-40">Username</th>
                            <th className="border py-3 px-2 w-40">Email</th>
                            <th className="border py-3 px-2 w-40">Phone</th>
                            <th className="border py-3 px-2 w-40">Website</th>
                            <th className="border py-3 px-2 w-40">Street</th>
                            <th className="border py-3 px-2 w-40">Suite</th>
                            <th className="border py-3 px-2 w-40">City</th>
                            <th className="border py-3 px-2 w-40">Zipcode</th>
                            <th className="border py-3 px-2 w-40">Geo (Lat)</th>
                            <th className="border py-3 px-2 w-40">Geo (Lng)</th>
                            <th className="border py-3 px-2 w-40">Company</th>
                            <th className="border py-3 px-2 w-40">Catch Phrase</th>
                            <th className="border py-3 px-2 w-40">BS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user: any, index: number) => (
                            <React.Fragment key={user.id || user._id}>
                                <motion.tr
                                    layout
                                    initial={false}
                                    animate={{
                                        boxShadow:
                                            selectedUserId === (user.id || user._id)
                                                ? "0px 4px 12px rgba(0, 0, 0, 0.1)"
                                                : "none",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className={`border-t cursor-pointer ${selectedUserId === (user.id || user._id)
                                        ? "bg-blue-100 dark:bg-neutral-900 p-2 h-16 rounded-2xl overflow-hidden"
                                        : "hover:bg-gray-50 dark:hover:bg-neutral-700"
                                        }`}
                                    onClick={() =>
                                        setSelectedUserId(
                                            selectedUserId === (user.id || user._id) ? null : user.id || user._id
                                        )
                                    }
                                >
                                    <td className="border py-4 pl-4 pr-2 w-10">{index + 1}</td>
                                    <td className="border py-4 px-2 w-40">{user.name}</td>
                                    <td className="border py-4 px-2 w-40">{user.username}</td>
                                    <td className="border py-4 px-2 w-40">
                                        <Link
                                            href={`mailto:${user.email}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-600 underline"
                                        >
                                            {user.email}
                                        </Link>

                                    </td>
                                    <td className="border py-4 px-2 w-40">{user.phone}</td>
                                    <td className="border py-4 px-2 w-40">
                                        <Link
                                            href={`http://www.${user.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-orange-600 underline">
                                            {user.website}
                                        </Link>
                                    </td>
                                    <td className="border py-4 px-2 w-40">{user.address?.street}</td>
                                    <td className="border py-4 px-2 w-40">{user.address?.suite}</td>
                                    <td className="border py-4 px-2 w-40">{user.address?.city}</td>
                                    <td className="border py-4 px-2 w-40">{user.address?.zipcode}</td>
                                    <td className="border py-4 px-2 w-40">{user.address?.geo?.lat}</td>
                                    <td className="border py-4 px-2 w-40">{user.address?.geo?.lng}</td>
                                    <td className="border py-4 px-2 w-40">{user.company?.name}</td>
                                    <td className="border py-4 px-2 w-40">{user.company?.catchPhrase}</td>
                                    <td className="border py-4 px-2 w-40">{user.company?.bs}</td>
                                </motion.tr>

                                <AnimatePresence>
                                    {selectedUserId === (user.id || user._id) && (
                                        <AnimatedRow
                                            user={user}
                                            isVisible={selectedUserId === (user.id || user._id)}
                                            onEdit={handleEditClick}
                                            onDelete={handleDelete}
                                        />
                                    )}
                                </AnimatePresence>
                            </React.Fragment>
                        ))}
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={15} className="text-left pl-96 p-4 text-lg text-gray-500 border">
                                    No users found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <EditUserDialog
                    open={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                    user={editData}
                />
            </div>
        </>
    )
}

export default UserTable


