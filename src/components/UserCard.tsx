"use client";
import Link from "next/link";
import { useState } from "react";
import AnimatedCardActions from "./AnimatedCardActions";
import EditUserDialog from "./EditUserDialog";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function UserCard({ filteredUsers, setUsers }: any) {
    const [selectedUserId, setSelectedUserId] = useState<number | string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editData, setEditData] = useState<any>(null);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleEditClick = (user: any) => {
        setEditData({ ...user });
        setIsDialogOpen(true);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    const handleDelete = async (id: number | string) => {
        const confirmDelete = confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`/api/users`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Failed to delete user");

            const updatedUsers = filteredUsers.filter((u: any) => (u.id || u._id) !== id);
            setUsers(updatedUsers);
            setSelectedUserId(null);
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete user.");
        }
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                    <div key={user.id || user._id} className={`${selectedUserId === (user.id || user._id) ? 'scale-105 pb-2 duration-300 rounded-2xl' : ''}`}>
                        <div
                            className={`transition-all duration-300 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-md hover:shadow-xl p-6 cursor-pointer hover:-translate-y-1 ${selectedUserId === (user.id || user._id)
                                ? "ring-2 ring-orange-600"
                                : ""
                                }`}
                            onClick={() =>
                                setSelectedUserId(
                                    selectedUserId === (user.id || user._id) ? null : user.id || user._id
                                )
                            }
                        >
                            <h2 className="text-xl font-bold text-orange-600 dark:text-orange-600 mb-2">{user.name}</h2>
                            <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                                <p><span className="font-medium">Username: </span> {user.username}</p>
                                <p>
                                    <span className="font-medium">Email: </span>
                                    <Link
                                        href={`mailto:${user.email}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-orange-600 underline"
                                    >
                                        {user.email}
                                    </Link>
                                </p>
                                <p><span className="font-medium">Phone: </span> {user.phone}</p>
                                <p>
                                    <span className="font-medium">Website: </span>{" "}
                                    <Link href={`http://www.${user.website}`} target="_blank" className="text-orange-600 underline">
                                        {user.website}
                                    </Link>
                                </p>

                                <div className="mt-3">
                                    <p className="font-semibold text-gray-900 dark:text-gray-200">Address</p>
                                    <p>{user.address?.street}, {user.address?.suite}</p>
                                    <p>{user.address?.city} - {user.address?.zipcode}</p>
                                    <p>Lat: {user.address?.geo?.lat}, Lng: {user.address?.geo?.lng}</p>
                                </div>

                                <div className="mt-3">
                                    <p className="font-semibold text-gray-900 dark:text-gray-200">Company</p>
                                    <p><span className="font-medium">Name: </span> {user.company?.name}</p>
                                    <p><span className="font-medium">Catch Phrase: </span> {user.company?.catchPhrase}</p>
                                    <p><span className="font-medium">BS: </span> {user.company?.bs}</p>
                                </div>
                            </div>
                        </div>

                        <AnimatedCardActions
                            user={user}
                            isVisible={selectedUserId === (user.id || user._id)}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                        />
                    </div>
                ))
            ) : (
                <div className="col-span-full text-center text-gray-500 py-10 text-lg">
                    No users found
                </div>
            )}
            <EditUserDialog
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                user={editData}
            />
        </div>
    );
}

export default UserCard;
