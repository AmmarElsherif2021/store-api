import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TopRated from './TopRated/TopRated';

import Footer from './Footer/Footer';

// hash link
import { HashLink as Link } from 'react-router-hash-link';


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
            <div className="hero-container">
                <h1 className="hero-title">Welcome to Our Awesome Website</h1>
                <h3 className="hero-subtitle">
                    Discover amazing features and services!
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Sed euismod, quam nec bibendum tincidunt,
                    odio libero tincidunt justo, vel tincidunt nunc turpis
                    et libero. Nullam nec justo vel nunc tincidunt facilisis.
                    Sed vel metus nec elit lacinia cursus. Fusce euismod,
                    justo vel bibendum dignissim, elit nunc tincidunt justo,
                    in tincidunt elit ex id libero. Sed euismod, quam nec bibendum tincidunt,
                    odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel
                    nunc tincidunt facilisis. Sed vel metus nec elit lacinia cursus. Fusce euismod, justo vel bibendum dignissim,
                    elit nunc tincidunt justo, in tincidunt elit ex id libero.

                    Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Sed euismod, quam nec bibendum tincidunt, odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel nunc tincidunt facilisis. Sed vel metus nec elit lacinia cursus. Fusce euismod, justo vel bibendum dignissim, elit nunc tincidunt justo, in tincidunt elit ex id libero. Sed euismod, quam nec bibendum tincidunt, odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel nunc tincidunt facilisis. Sed vel metus nec
                    Sed euismod, quam nec bibendum tincidunt,
                    odio libero tincidunt justo, vel tincidunt nunc turpis
                    et libero. Nullam nec justo vel nunc tincidunt facilisis.
                    Sed vel metus nec elit lacinia cursus. Fusce euismod,
                    justo vel bibendum dignissim, elit nunc tincidunt justo,
                    in tincidunt elit ex id libero. Sed euismod, quam nec bibendum tincidunt,
                    odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel
                    nunc tincidunt facilisis. Sed vel metus nec elit lacinia cursus. Fusce euismod, justo vel bibendum dignissim,
                    elit nunc tincidunt justo, in tincidunt elit ex id libero.
                    estibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Sed euismod, quam nec bibendum tincidunt, odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel nunc tincidunt facilisis. Sed vel metus nec elit lacinia cursus. Fusce euismod, justo vel bibendum dignissim, elit nunc tincidunt justo, in tincidunt elit ex id libero. Sed euismod, quam nec bibendum tincidunt, odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel nunc tincidunt facilisis. Sed vel metus nec
                    Sed euismod, quam nec bibendum tincidunt,
                    odio libero tincidunt justo, vel tincidunt nunc turpis
                    et libero. Nullam nec justo vel nunc tincidunt facilisis.
                    Sed vel metus nec elit lacinia cursus. Fusce euismod,
                    justo vel bibendum dignissim, elit nunc tincidunt justo,
                    in tincidunt elit ex id libero. Sed euismod, quam nec bibendum tincidunt,
                    odio libero tincidunt justo, vel tincidunt nunc turpis et libero. Nullam nec justo vel
                    nunc tincidunt facilisis. Sed vel metus nec elit lacinia cursus. Fusce euismod, justo vel bibendum dignissim,
                    elit nunc tincidunt justo, in tincidunt elit ex id libero.
                </h3>
                <button className="hero-button">
                    <Link smooth to="#top-rated">Get Started</Link>
                </button>
            </div>
            <ul>

                {
                    products.products?.map((product) => (
                        <li key={product._id}>{JSON.stringify(product)}</li>
                    ))
                }
            </ul>


            {/* list of top rated 10 products ------------------------------------------------------------------- */}

            <div id="top-rated"><TopRated /></div>
            <Footer />
        </div>
    );
};

export default HomePage;
