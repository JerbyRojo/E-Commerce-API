import React, { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import UserContext from '../UserContext';

const Order = () => {
  const { user } = useContext(UserContext); 
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let url = `${process.env.REACT_APP_API_BASE_URL}/order/my-orders`;

        // Check if the user is an admin
        if (user.isAdmin) {
          url = `${process.env.REACT_APP_API_BASE_URL}/order/all-orders`;
        }

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const responseData = await response.json();

        // Map through the responseData to extract productId from productsOrdered array for each order
        const ordersWithProductId = responseData.map(order => ({
          ...order,
          // Extracting productId for each product in productsOrdered array
          productIds: order.productsOrdered.map(product => product.productId).join(', ') // Assuming productId is available under productsOrdered array
        }));

        setOrders(ordersWithProductId);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="table-responsive">
      <h1 className="pr-5 mb-5">Check Orders</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Product IDs</th> {/* Changed from Product ID to Product IDs */}
            <th>Total Price</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.userId}</td>
              <td>{order.productIds}</td> {/* Displaying multiple productIds */}
              <td>{order.totalPrice}</td>
              <td>
                <ul>
                  {order.productsOrdered.map((product, index) => (
                    <li key={index}>{product.name} - Quantity: {product.quantity}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Order;