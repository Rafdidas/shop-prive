import './order.styles.scss';

import { FC } from 'react';

import { useCart, CartItem } from '../../contexts/cart.context';
import { useLocation, useNavigate } from 'react-router-dom';

const Order: FC = () => {
    const { cartItems } = useCart();
    const location = useLocation();
    const navigate = useNavigate();
    
    // 특정 상품만 주문하는 경우
    const customOrder = location.state?.customOrder || [];
    const orderItems: CartItem[] = customOrder.length > 0 ? customOrder : cartItems;

    const totalPrice = orderItems.reduce(
        (total: number, item: CartItem) => total + (item.price * (item.quantity || 1)),
        0
    );

    const totalQuantity = orderItems.reduce(
        (total: number, item: CartItem) => total + (item.quantity || 1),
        0
    );


    const handlePlaceOrder = () => {
        alert('주문 완료 !');
        navigate('/main');
    };

    return (
        <div>
            <h1>주문서</h1>
            {orderItems.length > 0 ? (
                <>
                    {orderItems.map((item) => (
                        <div key={item.id} className="order-item">
                            <img src={item.image} alt={item.title} />
                            <div>
                                <h3>{item.title}</h3>
                                <p>수량: {item.quantity || 1}</p>
                                <p>가격: ${item.price}</p>
                                <p>합계: ${item.price * (item.quantity || 1)}</p>
                            </div>
                        </div>
                    ))}
                    <div className="order-summary">
                        <p>총 주문 개수: {totalQuantity}개</p>
                        <p>총 주문 금액: ${totalPrice}</p>
                        <button onClick={handlePlaceOrder}>구매하기</button>
                    </div>
                </>
            ) : (
                <p>주문할 상품이 없습니다.</p>
            )}
        </div>
    );
}

export default Order;