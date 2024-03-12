import { Button, Modal, Form } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function EditProduct({ product, fetchData }) {

    const [productId, setProductId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [showEdit, setShowEdit] = useState(false);

    // function for opening the modal
    const openEdit = (productId) => {
        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                // populate all the input values with the product information that we fetched
                setProductId(data.product._id);
                setName(data.product.name);
                setDescription(data.product.description);
                setPrice(data.product.price);
            });

        // open the modal
        setShowEdit(true);
    };

    const closeEdit = () => {
        setShowEdit(false);
        setName('');
        setDescription('');
        setPrice('');
    };

    // Add editProduct function to update product

    const editProduct = (e) => {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_BASE_URL}/products/${productId}/update`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.message === "Product updated successfully") {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Product Successfully Updated'
                    });

                    closeEdit();
                    fetchData();
                } else {
                    Swal.fire({
                        title: 'Error',
                        icon: 'error',
                        text: 'Please Try Again'
                    });

                    closeEdit();
                    fetchData();
                }
            })
            .catch(error => {
                console.error('Error updating product:', error);
                closeEdit();
                fetchData();
            });
    };

    return (
        <>
            <Button variant="primary" size="sm" onClick={() => openEdit(product)}>Edit</Button>

            <Modal show={showEdit} onHide={closeEdit}>
                <Form onSubmit={editProduct}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="productPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type="number"
                                required
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEdit}>Close</Button>
                        <Button variant="success" type="submit">Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}