import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Checkout = ({ cartItems, user }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Correct hook for navigation

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/order/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
            userId: user ? user._id : null, // Assuming user object has _id property
          cartItems: cartItems
        })
      });
      const data = await response.json();
      console.log(data); // Log response from the server
      if (response.ok) {
        // Redirect to my orders page or display a success message
        navigate('/orders'); // Correct usage of useNavigate
      } else {
        // Handle errors
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
        {user && (
            <div className="mb-4">
                <p>User: {user.firstName} {user.lastName}</p>
                <p>Email: {user.email}</p>
            </div>
            )}
      <div className="mt-4">
        {/* Display cart items */}
        <h3 className="text-lg font-semibold mb-2">Cart Items:</h3>
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.productId} - Quantity: {item.quantity} - Price: ${item.subtotal}
            </li>
          ))}
        </ul>
      </div>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
};

export default Checkout;