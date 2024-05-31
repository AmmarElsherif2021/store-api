import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import Pagination from './Pagination';
import { Buffer } from 'buffer';

const ProductPage: React.FC = () => {
    const [products, setProducts] = useState<ProductState>({
        products: [],
        loading: true,
        error: null,
    });
    const pageLimit = 5;
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('/api/v1/products?fields=name,company,price,rating,image');
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


    const [pageProducts, setPageProducts] = useState(products.products);

    return (
        <div>
            {products.products && products.products.length > 0 ? (
                <ImageList sx={{ width: '99%', height: 450 }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">December</ListSubheader>
                    </ImageListItem>
                    {products.products.map((item) => (
                        <ImageListItem key={item._id}>
                            {item.image ? (
                                <img
                                    src={`data:image/jpg;base64,${Buffer.from(item.image.data).toString('base64')}`}
                                    alt={item.name}
                                    loading="eager"
                                />
                            ) : (
                                <p>No image available</p>
                            )}
                            <ImageListItemBar
                                title={item.name}
                                subtitle={item.company}
                                actionIcon={
                                    <IconButton
                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                        aria-label={`info about ${item.name}`}
                                    />
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : (
                <p>No products available.</p>
            )}
            <Pagination items={pageProducts} pageLimit={pageLimit} setPageItems={setPageProducts} />
        </div>
    );
};

export default ProductPage;
