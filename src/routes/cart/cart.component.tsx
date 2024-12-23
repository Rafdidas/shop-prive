import { FC } from 'react';
import './cart.styles.scss';
import { useCart } from '../../contexts/cart.context';
import { useNavigate } from 'react-router-dom';

const Cart: FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleDetailOrder = () => {
        if (cartItems.length === 0) {
            alert("장바구니에 상품이 없습니다.");
            return;
        }
        navigate("/order");
    }

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
                            <button onClick={() => removeFromCart(item.id)}>제거</button>
                        </li>
                    )
                })
            }
            </ul>
            <button onClick={clearCart}>장바구니 비우기</button>
            <button onClick={handleDetailOrder}>구매하기</button>
        </div>
    );
}

export default Cart;