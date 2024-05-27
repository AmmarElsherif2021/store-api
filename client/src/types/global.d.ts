//global types module:

export { };//this file contains type declarations but doesn’t introduce any runtime code.
declare module '../../layout/Navbar/Navbar';

declare global {
    interface Product {
        _id: Key;
        name: String;
        price: Number;
        featured: Boolean;//false
        rating: Number;//4.5
        createdAt: Date;// Date.now(),

        company: String;//enums: {values: ['ikea', 'liddy', 'caressa', 'marcos']},
    }
    interface ProductState {
        [x: string]: any;
        products: Product[] | null;
        loading: boolean;
        error: string | null;
    }

}

