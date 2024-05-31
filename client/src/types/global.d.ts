//global types module:

export { };//this file contains type declarations but doesn’t introduce any runtime code.
declare module '../../layout/Navbar/Navbar';

declare global {
    interface Product {
        _id: Key;
        name: string;
        price: number;
        featured: boolean;//false
        rating: number;//4.5
        createdAt: Date;// Date.now(),
        image: { type: string, data: number[] };
        company: string;//enums: {values: ['ikea', 'liddy', 'caressa', 'marcos']},
    }
    interface ProductState {
        [x: string]: any;
        products: Product[] | null;
        loading: boolean;
        error: string | null;
    }

}

