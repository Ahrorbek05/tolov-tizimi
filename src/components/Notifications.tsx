import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell } from 'lucide-react';

interface Notification {
    message: string;
}

interface NotificationsProps {
    notifications: Notification[];
    removeNotification: (index: number) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ notifications, removeNotification }) => {
    return (
        <div className="fixed bottom-4 right-4 w-80">
            <AnimatePresence>
                {notifications.map((notification, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50, scale: 0.3 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                        className="bg-white border-l-4 border-blue-500 rounded-lg shadow-md p-4 mb-2"
                    >
                        <div className="flex items-center">
                            <Bell className="text-blue-500 mr-2" size={18} />
                            <p className="text-gray-800">{notification.message}</p>
                        </div>
                        <button
                            onClick={() => removeNotification(index)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Notifications;