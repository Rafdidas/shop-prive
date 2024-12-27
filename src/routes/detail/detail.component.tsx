import './detail.styles.scss';

import { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProductDetail } from '../../store/detail/detail.action';
import { clearProductDetail } from '../../store/detail/detail.slice';
import { addToCart } from '../../store/cart/cart.slice';

const Detail: FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { productDetail, loading, error } = useSelector((state: RootState) => state.detail);
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetail(productId));
        }

        return () => {
            dispatch(clearProductDetail());
        };
    }, [dispatch, productId]);

    const handleAddToCart = () => {
        if (productDetail) {
            dispatch(addToCart({ ...productDetail, quantity: 1 }));
        }
    };

    const handleBuyNow = () => {
        if (!productDetail) return;

        if (cartItems.length > 0) {
            const confirm = window.confirm("장바구니 상품과 함께 구매하시겠습니까?");
            if (confirm) {
                dispatch(addToCart({ ...productDetail, quantity: 1 }));
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
                <button onClick={handleAddToCart}>Add to Cart</button>
                <button onClick={handleBuyNow}>Buy Now</button>
            </div>
        </div>
    );
}

export default Detail;