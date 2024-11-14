import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, X } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    price: number;
}

interface CartProps {
    cart: Product[];
    removeFromCart: (index: number) => void;
    placeOrder: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, placeOrder }) => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Savatcha</h2>
            {cart.length === 0 ? (
                <p>Savatchangiz bo'sh</p>
            ) : (
                <>
                    <ul className="divide-y divide-gray-200">
                        {cart.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3 }}
                                className="py-4 flex justify-between items-center"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => removeFromCart(index)}
                                >
                                    <X size={18} />
                                </motion.button>
                            </motion.li>
                        ))}
                    </ul>
                    <div className="mt-4 flex justify-between items-center">
                        <p className="text-xl font-bold">Jami: ${total.toFixed(2)}</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                            onClick={placeOrder}
                        >
                            <ShoppingBag className="mr-2" size={18} />
                            Buyurtma berish
                        </motion.button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;