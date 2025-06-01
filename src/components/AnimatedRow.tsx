import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const AnimatedRow = ({ user, onEdit, onDelete, isVisible, index }: any) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (contentRef.current) {
            setHeight(contentRef.current.scrollHeight);
        }
    }, [isVisible]);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.tr
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >
                    <td colSpan={15} className="px-4 py-2 border">
                        <div
                            ref={contentRef}
                            className={`${isVisible ? "visible" : "hidden"}`}
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="flex gap-2 justify-center"
                            >
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(user);
                                    }}
                                    variant={'default'}
                                    className="px-10 py-1 w-1/2 cursor-pointer text-xs text-white bg-green-500 rounded hover:bg-green-600"
                                >
                                    Edit
                                </Button>
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete(user.id || user._id);
                                    }}
                                    variant={'default'}
                                    className="px-10 py-1 text-xs w-1/2 cursor-pointer text-white bg-red-500 rounded hover:bg-red-600"
                                >
                                    Delete
                                </Button>
                            </motion.div>
                        </div>
                    </td>
                </motion.tr>
            )}
        </AnimatePresence>
    );
};

export default AnimatedRow;
