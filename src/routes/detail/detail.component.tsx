import './detail.styles.scss';

import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDetail } from "../../contexts/detail.context";
import { useCart } from '../../contexts/cart.context';

const Detail: FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { productDetail, loading, fetchProductDetail } = useDetail();
    const { addToCart, cartItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (productId) {
            fetchProductDetail(productId);
        }
    }, [productId]);

    const handleBuyNow = () => {
        if (!productDetail) return;

        if (cartItems.length > 0) {
            const confirm = window.confirm("장바구니 상품과 함께 구매하시겠습니까?");
            if (confirm) {
                addToCart(productDetail);
                navigate('/order');
            } else {
                navigate("/order", { state: { customOrder: [productDetail] } });
            }
        } else {
            navigate("/order", { state: { customOrder: [productDetail] } });
        }
    };

    return (
        <div id="detail">
            <div className="info_wrap">
                <img src={productDetail?.image} alt={productDetail?.title} />
                <h1>{productDetail?.title}</h1>
                <p>가격: ${productDetail?.price}</p>
                <p>{productDetail?.description}</p>
                <button onClick={
                    () => productDetail && addToCart(productDetail)
                    }>장바구니에 추가
                </button>
                <button onClick={handleBuyNow}>구매하기</button>
            </div>
        </div>
    );
}

export default Detail;