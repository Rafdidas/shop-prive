import { FC } from 'react';
import './cart.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearCart, removeFromCart } from '../../store/cart/cart.slice';

const Cart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);

    const handleDetailOrder = () => {
        if (cartItems.length === 0) {
            alert("장바구니에 상품이 없습니다.");
            return;
        }
        navigate("/order");
    };

    const handleRemoveItem = (producId: number) => {
        dispatch(removeFromCart(producId));
    }

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div id='cart'>
            <h1>장바구니</h1>
            <ul>
            {
                cartItems.map((item) => {
                    return (
                        <li key={item.id}>
                            <img src={item.image} alt={item.title} width="50" />
                            <p>{item.title}</p>
                            <p>수량: {item.quantity}</p>
                            <p>가격: ${item.price * item.quantity}</p>
                            <button onClick={() => handleRemoveItem(item.id)}>제거</button>
                        </li>
                    )
                })
            }
            </ul>
            <button onClick={handleClearCart}>장바구니 비우기</button>
            <button onClick={handleDetailOrder}>구매하기</button>
        </div>
    );
}

export default Cart;