import './product-card.styles.scss';

import { Product } from '../../contexts/products.context';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    category?: string;
}

const ProductCard: FC<ProductCardProps> = ({ product, category }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/shop/${category}/${product.id}`);
    }

    return (
        <div className='product-card' onClick={handleClick}>
            <img src={product.image} alt={product.title} className='img-box' />
            <p>{product.brand}</p>
            <p className='prd-name'>{product.title}</p>
            <p className='prd-desc'>{product.description}</p>
            <p className='prd-price'>Price: ${product.price}</p>
        </div>
    );
}

export default ProductCard;