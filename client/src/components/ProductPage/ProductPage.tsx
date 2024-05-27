import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';



const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<ProductState>({
        products: [],
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
                    products: [],
                    loading: false,
                    error: 'Error fetching products',
                });
            }
        };
        fetchProducts();
    }, []);

    //Paginate.......................................................................................
    const pageLimit = 10;
    const [pageProducts, setPageProducts] = useState(products.products);

    return (
        <div>
            {products.products && products.products.length > 0 ? (
                <li>
                    {pageProducts && pageProducts.map((p: Product | null, i: number) => (
                        <li key={i}>{JSON.stringify(p)}</li>
                    ))}
                </li>
            ) : (
                <p>No products available.</p>
            )}

            <Pagination
                items={products.products}
                pageLimit={pageLimit}
                setPageItems={setPageProducts}
            />
        </div>
    );
};

export default ProductPage;
