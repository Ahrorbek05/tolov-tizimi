import React from 'react';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';

interface Order {
    id: number;
    status: string;
    total: number;
}

interface OrdersProps {
    orders: Order[];
}

const Orders: React.FC<OrdersProps> = ({ orders }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Buyurtmalar</h2>
            {orders.length === 0 ? (
                <p>Sizda hali buyurtmalar yo'q</p>
            ) : (
                <ul className="divide-y divide-gray-200">
                    {orders.map((order) => (
                        <motion.li
                            key={order.id}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="py-4"
                        >
                            <div className="flex items-center">
                                <Package className="mr-3 text-blue-500" size={24} />
                                <div>
                                    <h3 className="text-lg font-semibold">Buyurtma #{order.id}</h3>
                                    <p className="text-gray-600">Holat: {order.status}</p>
                                    <p className="text-gray-600">Jami: ${order.total.toFixed(2)}</p>
                                </div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Orders;