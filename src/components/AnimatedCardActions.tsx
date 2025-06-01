import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const AnimatedCardActions = ({ user, onEdit, onDelete, isVisible }: any) => {
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
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                >
                    <div ref={contentRef} className="pt-4 flex gap-2 justify-between">
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(user);
                            }}
                            className="flex-1 text-xs bg-green-500 hover:bg-green-600 text-white"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(user.id || user._id);
                            }}
                            className="flex-1 text-xs bg-red-500 hover:bg-red-600 text-white"
                        >
                            Delete
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedCardActions;
