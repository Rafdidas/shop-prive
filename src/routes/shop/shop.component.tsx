import './shop.styles.scss';

import { useProducts } from '../../contexts/products.context';
import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';

import ProductCard from "../../components/product-card/product-card.component";

const Shop: FC = () => {
    const { category } = useParams<{ category?: string }>();
    const { products, loading, fetchProducts, currentPage, hasMore } = useProducts();
    
    useEffect(() => {
        if (category) {
            fetchProducts(1, category);
        } else {
            fetchProducts(1);
        }
    }, [category]);

    const loadMore = () => {
        if (hasMore && !loading && !category) {
            fetchProducts(currentPage + 1);
        }
    };

    return (
        <div className="shop_list_container">
            <h2>{category ? `${category.toUpperCase()} 제품 목록` : "모든 제품 목록"}</h2>
            <div className='shop_list'>
                {
                    products.map((product) => {
                        return (
                            <ProductCard key={product.id} product={product} category={category} />
                        )
                    })
                }
            </div>
            {hasMore && !loading && !category && (
                <button onClick={loadMore}>Load More</button>
                )}
        </div>
    )
}

export default Shop;