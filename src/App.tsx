import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Notifications from './components/Notifications';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface Order {
  id: number;
  items: Product[];
  total: number;
  status: string;
}

interface Notification {
  message: string;
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const products: Product[] = [
    { id: 1, name: 'Mahsulot 1', price: 100 },
    { id: 2, name: 'Mahsulot 2', price: 200 },
    { id: 3, name: 'Mahsulot 3', price: 300 },
  ];

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    addNotification('Tizimga muvaffaqiyatli kirdingiz');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    

    setIsLoggedIn(true);
    addNotification("Muvaffaqiyatli ro'yxatdan o'tdingiz");
  };

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
    addNotification(`${product.name} savatga qo'shildi`);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    addNotification('Mahsulot savatdan olib tashlandi');
  };

  const placeOrder = () => {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const newOrder: Order = {
      id: orders.length + 1,
      items: [...cart],
      total: total,
      status: 'Kutilmoqda',
    };
    setOrders([...orders, newOrder]);
    setCart([]);
    addNotification(`Buyurtma #${newOrder.id} joylashtirildi`);
  };

  const addNotification = (message: string) => {
    setNotifications([...notifications, { message }]);
  };

  const removeNotification = (index: number) => {
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4">
        {showRegister ? (
          <Register onRegister={handleRegister} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <button
          className="mt-4 text-blue-500 hover:text-blue-700"
          onClick={() => setShowRegister(!showRegister)}
        >
          {showRegister ? 'Kirish' : "Ro'yxatdan o'tish"}
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">To'lov va Buyurtma Monitoringi</h1>
      <ProductList products={products} addToCart={addToCart} />
      <Cart cart={cart} removeFromCart={removeFromCart} placeOrder={placeOrder} />
      <Orders orders={orders} />
      <Notifications notifications={notifications} removeNotification={removeNotification} />
    </div>
  );
};

export default App;