import './shop.styles.scss';

import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts } from '../../store/products/products.action';

import ProductCard from "../../components/product-card/product-card.component";


const Shop: FC = () => {
    const { category } = useParams<{ category?: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading, currentPage, hasMore } = useSelector((state: RootState) => state.products);
    
    useEffect(() => {
        if (category) {
            dispatch(fetchProducts({ page: 1, category }));
        } else {
            dispatch(fetchProducts({ page: 1 }));
        }
    }, [dispatch, category]);

    const loadMore = () => {
        if (hasMore && !loading && !category) {
            dispatch(fetchProducts({ page: currentPage + 1 }));
        }
    };

    return (
        <div className="shop_list_container">
            <div className='wrap_inner'>
            <h2 className='subtitle'>{category ? `${category.toUpperCase()} 제품 목록` : "모든 제품 목록"}</h2>
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
                <button onClick={loadMore} className='morebtn'>더 보기</button>
                )}
            </div>
        </div>
    )
}

export default Shop;