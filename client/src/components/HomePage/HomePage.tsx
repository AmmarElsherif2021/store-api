import React, { useEffect, useState } from 'react';
import Navbar from '../../layout/Navbar/Navbar';
import axios from 'axios';



const HomePage: React.FC = () => {
    const [products, setProducts] = useState<ProductState>({
        products: null,
        loading: true,
        error: null,
    });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/v1/products?fields=name,company,price,rating');
                setProducts({
                    products: response.data.products,
                    loading: false,
                    error: null,
                });
                if (response.data.products && response.data.products.length) {
                    console.log(response.data.products);
                } else {
                    console.log('Axios Error: No products received');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    // Handle Axios-specific errors
                    console.error(error.response?.data);
                    console.error(error.response?.status);
                    console.error(error.response?.headers);
                } else {
                    // Handle other errors
                    console.error('Error', (error as Error).message);
                }
                setProducts({
                    products: null,
                    loading: false,
                    error: 'Error fetching products',
                });
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h1>HOME   ... </h1>
            <ul>

                {
                    products.products?.map((product) => (
                        <li key={product._id}>{JSON.stringify(product)}</li>
                    ))
                }
            </ul>
        </div>
    );
};

export default HomePage;
