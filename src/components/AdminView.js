// a. Add useState and useEffect
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';

export default function AdminView({ productsData, fetchData }) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsArr = productsData.map(product => (
            <tr key={product._id}>
                <td>{product._id}</td>
                <td>
                    <div className="product-info">
                        <img src="favicon.ico" alt={product.name} className="product-image" />
                        <div className="product-details">
                            <div>{product.name}</div>
                            <div>{product.description}</div>
                        </div>
                    </div>
                </td>
                <td>₱{product.price.toFixed(2)}</td>
                <td className={product.isActive ? "text-success" : "text-danger"}>
                    {product.isActive ? "Available" : "Unavailable"}
                </td>
                <td><EditProduct product={product._id} fetchData={fetchData}/></td>
                <td><ArchiveProduct className="btn btn-danger" product={product._id} isActive={product.isActive} fetchData={fetchData}/></td>
            </tr>
        ));

        setProducts(productsArr);
    }, [productsData, fetchData]);

    return (
        <div className="admin-view">
            <h1 className="text-center mb-4">Admin Dashboard</h1>
            <div className="text-center m-1">
            <Link className="btn btn-info d-inline-block m-1" to="/addProduct">Add Product</Link>
            <Link className="btn btn-success d-inline-block m-1" to="/orders">Order Details</Link>
            </div>
            <Table striped bordered hover responsive className="product-table">
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th colSpan="2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </div>
    );
}