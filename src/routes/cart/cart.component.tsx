import { FC, } from 'react';
import './cart.styles.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { clearCart, removeFromCart, toggleAllCheck, toggleItemCheck } from '../../store/cart/cart.slice';

const Cart: FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const allChecked = cartItems.every(item => item.checked);
    const selectedItems = cartItems.filter(item => item.checked);
    const totalSelectedPrice = selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleToggleAll = () => {
        dispatch(toggleAllCheck(!allChecked));
    };

    const handleToggleItem = (id: number) => {
        dispatch(toggleItemCheck(id));
    };

    const handleDetailOrder = () => {
        if (cartItems.length === 0) {
            alert("장바구니에 상품이 없습니다.");
            return;
        }
        navigate('/order', { state: { customOrder: selectedItems } });
    };

    const handleRemoveItem = (producId: number) => {
        dispatch(removeFromCart(producId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    return (
        <div id='cart'>
            <div className='wrap_inner'>
                <h2 className='subtitle'>장바구니</h2>

                <div className='cart_wrap'>
                    <div className="area_left">
		                <div className="enterprise headY">
                            <div className="cart_chk">
                                <label>
                                    <input type="checkbox" className="partner_check_all_0" checked={allChecked} onChange={handleToggleAll} />
                                    전체선택({selectedItems.length}/{cartItems.length})
                                </label>
                                {/* <span className="btn_chk_del">선택삭제</span> */}
                            </div>
                            <div className="tbl_col prd">
                                
                                <ul className="thead">
                                    <li style={{ width: "125px" }}></li>
                                    <li>상품정보</li>
                                    <li style={{ width: "14%" }}>옵션/수량</li>
                                    <li style={{ width: "10%" }}>적립금</li>
                                    <li style={{ width: "14%" }}>총 금액</li>
                                    <li style={{ width: "70px" }}></li>
                                </ul>
                                    {
                                        cartItems.map((item) => {
                                            return (
                                                <ul className="tbody" key={item.id}>
                                                    <li className="prdimg">
                                                        <div className="img">
                                                            <input type="checkbox" name="cno[]" checked={item.checked} onChange={() => handleToggleItem(item.id)} />
                                                            <img src={item.image} alt={item.title} />
                                                        </div>
                                                    </li>
                                                    <li className="prd tal">
                                                        <p className="name">{item.title}</p>
                                                        
                                                        <p className="prc">${item.price * item.quantity}</p>
                                                        
                                                    </li>
                                                    <li>
                                                        <p className="txt_gray"> {item.quantity}개</p>
                                                        
                                                    </li>
                                                    <li><span className="m_txt">적립금 : </span> {Math.floor(item.price * 0.1)} point</li> 
                                                    
                                                    <li className="total is_sale">
                                                        <div>
                                                            <span className="m_txt">총 금액</span>
                                                            <strong>
                                                                <span className="after">${item.price * item.quantity}</span>
                                                            </strong>
                                                        </div>
                                                    </li>
                                                    <li className="btn">
                                                        <span className="btn_del" onClick={() => handleRemoveItem(item.id)}>삭제</span>
                                                    </li>
                                                </ul>
                                            )
                                        })
                                    }
                            </div>

                            <div className="cart_btn">
                                <div className="btn">
                                    <p className="box_btn mini grline"><span onClick={handleClearCart}>장바구니 비우기</span></p>
                                </div>
                                <div className="msg">
                                    <p>상품 쿠폰 및 적립금 사용은 [주문서 작성/결제]에서 적용됩니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="area_right">
                        <div className="inner">
                            <div className="box">
                                <h3 className="title first">결제금액</h3>
                                <div className="prc_order">
                                    <dl>
                                        <dt>총 주문금액</dt>
                                        <dd>$<span className="total_prd_prc">{totalSelectedPrice}</span></dd>
                                    </dl>
                                    <dl>
                                        <dt>총 배송비</dt>
                                        <dd>$<span id="dlv_prc_cart" className="dlv_prc_cart">0</span></dd>
                                    </dl>
                                    <dl className="total_sale_prc_field">
                                        <dt>할인예상금액 </dt>
                                        <dd className="p_color">- $<span className="total_sale_prc">0</span></dd>
                                    </dl>
                                    <div id="discount_info" className="view_info">
                                        
                                        <dl className="cart_area_sale4_dlv" >
                                            <dt>회원 무료배송</dt>
                                            <dd>- $<span className="total_sale4_dlv_prc">0</span></dd>
                                        </dl>
                                        
                                        <dl className="cart_area_sale9" >
                                            <dt>수량 할인금액</dt>
                                            <dd>- $<span className="order_area_sale9_prc">0</span></dd>
                                        </dl>
                                        
                                    </div>
                                    <div className="total_prc">
                                        <dl>
                                            <dt>총 결제금액</dt>
                                            <dd className="p_color">$<span id="total_order_price_cartlist" className="price total_order_price_cartlist">{totalSelectedPrice}</span></dd>
                                        </dl>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="btn_order_wrap"><p className="btn_order box_btn huge block"><span onClick={handleDetailOrder}>선택상품 주문하기</span></p></div>
                        </div>
                    </div>
                </div>

                {/* <button onClick={handleDetailOrder}>구매하기</button> */}
            </div>
        </div>
    );
}

export default Cart;