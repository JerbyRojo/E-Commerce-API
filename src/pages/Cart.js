import React, { useState, useEffect } from 'react';
import Checkout from './Checkout'; // Import the Checkout component


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false); // State to toggle Checkout component visibility

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/cart/get-cart`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch cart');
        }
        const data = await response.json();
        console.log('Data from server:', data);
        if (!Array.isArray(data.cart.cartItems)) {
          throw new Error('Cart items data is not an array');
        }
        setCartItems(data.cart.cartItems);
        setUser(data.user);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const handleCheckout = () => {
    setShowCheckout(true); // Show the Checkout component when the checkout button is clicked
  };

  return (
    <div className="container px-0 mt-36">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      {user && (
        <div className="mb-4">
          <p>User: {user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item, index) => (
            <div key={index} className="border-b py-2">
              <p className="font-semibold">{item.productId}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.subtotal}</p>
            </div>
          ))}
          <button className="bg-black hover:bg-gray-300 text-white font-bold py-2 px-4 mt-4 rounded" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
      {/* Render the Checkout component if showCheckout is true */}
      {showCheckout && <Checkout cartItems={cartItems} user={user} />}
    </div>
  );
};

export default Cart;