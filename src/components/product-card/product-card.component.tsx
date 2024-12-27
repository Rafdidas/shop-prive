import './product-card.styles.scss';

import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Products } from '../../store/products/products.slice';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cart/cart.slice';
import { AppDispatch } from '../../store/store';

interface ProductCardProps {
    product: Products;
    category?: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, category }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
        navigate(`/shop/${category}/${product.id}`);
    }

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
    };

    return (
        <div className='product_card_container'>
            <div className='product_card' onClick={handleClick}>
                <img src={product.image} alt={product.title} className='img_box' />
                <p>{product.brand}</p>
                <p className='prd_name'>{product.title}</p>
                <p className='prd_desc'>{product.description}</p>
                <p className='prd_price'>Price: ${product.price}</p>
            </div>
            <button onClick={handleAddToCart}>장바구니에 추가</button>
        </div>
        
    );
}

export default ProductCard;