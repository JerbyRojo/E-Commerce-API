import React, { useState } from 'react';

const ProductSearchByPrice = () => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/products/search/price`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ minPrice, maxPrice }),
            });

            const data = await response.json();

            if (response.ok) {
                setProducts(data);
            } else {
                console.error(`Error: ${data.message}`);
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <h2>Search Products by Price Range</h2>
                <div className="mb-3">
                    <label htmlFor="minPrice">Min Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min Price"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="maxPrice">Max Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-3">Search</button>
            </form>
            <h3>Search Results:</h3>
            <ul className="mt-3">
                {products.map((product) => (
                    <li key={product._id}>{product.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductSearchByPrice;