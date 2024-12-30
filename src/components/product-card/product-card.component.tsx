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
        dispatch(addToCart({ ...product, quantity: 1, checked: true }));
        alert('장바구니에 상품이 담겼습니다.');
    };

    return (
        <div className='product_card_container'>
            <div className='product_card' >
                <img src={product.image} alt={product.title} className='img_box' onClick={handleClick} />
                <div className='info'>
                    <p className='prd_brand'>{product.brand}</p>
                    <p className='prd_name' onClick={handleClick}>{product.title}</p>
                    <p className='prd_desc'>{product.description}</p>
                    <p className='prd_price'>Price: ${product.price}</p>
                    <button className='cart_btn' onClick={handleAddToCart}>장바구니에 추가</button>
                </div>
            </div>
        </div>
        
    );
}

export default ProductCard;