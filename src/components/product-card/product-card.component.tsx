import './product-card.styles.scss';

import { Product } from '../../contexts/products.context';
import { FC } from 'react';

interface ProductCardProps {
    product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {

    return (
        <div className='product-card'>
            <p>{product.id}</p>
            <img src={product.image} alt={product.title} className='img-box' />
            <p className='prd-name'>{product.title}</p>
            <p className='prd-desc'>{product.description}</p>
            <p className='prd-price'>Price: ${product.price}</p>
        </div>
    );
}

export default ProductCard;