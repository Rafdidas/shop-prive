import { FC } from 'react';
import './cart.styles.scss';
import { useCart } from '../../contexts/cart.context';

const Cart: FC = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();

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
        </div>
    );
}

export default Cart;