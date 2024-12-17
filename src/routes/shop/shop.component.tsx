import './shop.styles.scss';

import { useProducts } from '../../contexts/products.context';
import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';

import ProductCard from "../../components/product-card/product-card.component";

const Shop: FC = () => {
    const { category } = useParams<{ category?: string }>();
    const { products, loading, fetchProducts, currentPage, hasMore } = useProducts();
    
    useEffect(() => {
        fetchProducts(1, category);
    }, [category]);

    const loadMore = () => {
        if (hasMore && !loading) {
            fetchProducts(currentPage + 1, category);
        }
    };

    return (
        <div className="shop_list_container">
            <div className='shop_list'>
                {
                    products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} />
                        )
                    })
                }
            </div>
            {hasMore && !loading && <button onClick={loadMore}>Load More</button>}
        </div>
    )
}

export default Shop;