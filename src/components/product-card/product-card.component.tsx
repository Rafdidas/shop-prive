import './product-card.styles.scss';

import { Product } from '../../contexts/products.context';
import { FC, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

import { useCart } from '../../contexts/cart.context';

interface ProductCardProps {
    product: Product;
    category?: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/shop/${category}/${product.id}`);
    }

    const { addToCart } = useCart();

    return (
        <div className='product_card_container'>
            <div className='product_card' onClick={handleClick}>
                <img src={product.image} alt={product.title} className='img_box' />
                <p>{product.brand}</p>
                <p className='prd_name'>{product.title}</p>
                <p className='prd_desc'>{product.description}</p>
                <p className='prd_price'>Price: ${product.price}</p>
            </div>
            <button onClick={() => product && addToCart(product)}>장바구니에 추가</button>
        </div>
        
    );
}

export default ProductCard;