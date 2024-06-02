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
    const [page, setPage] = useState(1);
    const [nextData, setNextData] = useState<{ page: number, data: Product[] }>(
        {
            page: 1,
            data: []
        });

    //get nextData
    const getNextData = async () => {
        try {
            const res = await axios.get(`/api/v1/products?page=${page + 1}&fields=name,company,price,rating,image`);
            setNextData({
                page: page + 1,
                data: res.data.products
            });
        } catch (err) {
            console.error(err);
        }
    }


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = nextData.data.length == 0 && page !== nextData.page ? await axios.get(`/api/v1/products?page=${page}&fields=name,company,price,rating,image`) : { data: { products: [...nextData.data] } };
                setProducts({
                    products: response.data.products,
                    loading: false,
                    error: null,
                });
                getNextData();
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
    }, [page]);


    useEffect(() => console.log('page updated'), [page]);

    return (
        <div>

            {products.products && products.products.length > 0 ? (
                <ImageList sx={{ width: '99%', height: '80%' }}>
                    <ImageListItem key="Subheader" cols={2}>
                        <ListSubheader component="div">December</ListSubheader>
                    </ImageListItem>
                    {products.products.map((item) => (
                        <ImageListItem key={item._id}>
                            {item.image ? (
                                <img
                                    src={`data: image / jpg; base64, ${Buffer.from(item.image.data).toString('base64')} `}
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
                                        aria-label={`info about ${item.name} `}
                                    />
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            ) : products.loading ? (<p>LOADING</p>) : (
                <p>No products available.</p>
            )}
            <button onClick={() => setPage((p) => p != 1 ? p - 1 : 1)} >-</button>
            {page}
            <button onClick={() => setPage(p => p + 1)}>+</button>
        </div>
    );
};

export default ProductPage;
//<Pagination items={pageProducts} pageLimit={pageLimit} setPageItems={setPageProducts} />