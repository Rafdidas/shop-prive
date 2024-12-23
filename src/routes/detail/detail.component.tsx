import './detail.styles.scss';

import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDetail } from "../../contexts/detail.context";
import { useCart } from '../../contexts/cart.context';

const Detail: FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { productDetail, loading, fetchProductDetail } = useDetail();
    const { addToCart } = useCart();
    useEffect(() => {
        if (productId) {
            fetchProductDetail(productId);
        }
    }, [productId]);

    return (
        <div id="detail">
            <div className="info_wrap">
                <img src={productDetail?.image} alt={productDetail?.title} />
                <h1>{productDetail?.title}</h1>
                <p>가격: ${productDetail?.price}</p>
                <p>{productDetail?.description}</p>
                <button onClick={() => productDetail && addToCart(productDetail)}>장바구니에 추가</button>
            </div>
        </div>
    );
}

export default Detail;