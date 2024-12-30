import './detail.styles.scss';

import { FC, useEffect, useState } from "react";
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

    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (productId) {
            dispatch(fetchProductDetail(productId));
        }

        return () => {
            dispatch(clearProductDetail());
        };
    }, [dispatch, productId]);

    useEffect(() => {
        if (productDetail) {
            setTotalPrice(productDetail.price * quantity);
        }
    }, [productDetail, quantity]);

    const handleQuantity = (newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantity(newQuantity);
    }

    const handleAddToCart = () => {
        if (productDetail) {
            dispatch(addToCart({ ...productDetail, quantity}));
            alert('장바구니에 상품이 담겼습니다.');
        }
        
    };

    const handleBuyNow = () => {
        if (!productDetail) return;

        if (cartItems.length > 0) {
            const confirm = window.confirm("장바구니 상품과 함께 구매하시겠습니까?");
            if (confirm) {
                dispatch(addToCart({ ...productDetail, quantity}));
                navigate('/order');
            } else {
                navigate("/order", { state: { customOrder: [{ ...productDetail, quantity }] } });
            }
        } else {
            navigate("/order", { state: { customOrder: [{ ...productDetail, quantity }] } });
        }
    };

    return (
        <div id="detail">
            <div className='wrap_inner'>
                <div className="wrap_prd">
                    <div className='prd_img'>
                        <img src={productDetail?.image} alt={productDetail?.title} />
                    </div>
                    <div className='info'>
                        <p className='brand'>{productDetail?.brand}</p>
                        <h1 className='name'>{productDetail?.title}</h1>
                        <p className='summary'>{productDetail?.description}</p>
                        <p className='price'>${productDetail?.price}</p>
                        <div className='qty_total'>
                            <div className='qty_section'>
                                <p>수량</p>
                                <div className="box_qty">
                                    <input 
                                        type="text" 
                                        name='buy_ea'
                                        className='form_input'
                                        value={quantity}
                                        onChange={(e) => handleQuantity(Number(e.target.value))}
                                    />
                                    <div className="btn_ea">
                                        <span className="ea_up" onClick={() => handleQuantity(quantity + 1)}></span>
                                        <span className="ea_down" onClick={() => handleQuantity(quantity - 1)}></span>
                                    </div>
                                </div>
                            </div>
                            <div className="opt_total">
                                <span className="title">총 금액</span>
                                <div>
                                    <span className="sell_prc_str_total">${totalPrice}</span>
                                </div>
                            </div>
                        </div>
                        <div className='btn'>
                            <button className='cart_btn' onClick={handleAddToCart}>장바구니</button>
                            <button className='buy_btn' onClick={handleBuyNow}>구매하기</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;