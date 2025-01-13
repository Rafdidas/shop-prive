import './order.styles.scss';

import { FC, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { CartItem } from '../../store/cart/cart.slice';

const Order: FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const location = useLocation();
    const navigate = useNavigate();

    const currentUser = useSelector((state: RootState) => state.user.currentUser);

    const [agreeGuestOrder, setAgreeGuestOrder] = useState(false);
    const [reconfirm, setReconfirm] = useState(false);
    const [buyerInfo, setBuyerInfo] = useState({
        name: '',
        cell: '',
        email: '',
    });
    const [addressInfo, setAddressInfo] = useState({
       addressName: '',
       cell: '',
       zip: '',
       addr1: '',
       addr2: '',
    });
    const [deliveryMemo, setDeliveryMemo] = useState('');
    const [payType, setPayType] = useState('');
    const [bank, setBank] = useState('');
    const [bankName, setBankName] = useState('');
    
    // 특정 상품만 주문하는 경우
    const customOrder: CartItem[] = location.state?.customOrder || [];
    const orderItems: CartItem[] = customOrder.length > 0 ? customOrder : cartItems;

    const totalPrice = orderItems.reduce(
        (total: number, item: CartItem) => total + (item.price * (item.quantity || 1)),
        0
    );

    const totalQuantity = orderItems.reduce(
        (total: number, item: CartItem) => total + (item.quantity || 1),
        0
    );

    const validateForm = () => {
        if (!currentUser && !agreeGuestOrder) {
            alert('비회원 개인정보 수집·이용에 동의해주세요.');
            return false;
        }

        if (!buyerInfo.name || !buyerInfo.cell || !buyerInfo.email) {
            alert('주문자 정보를 모두 입력해주세요.');
            return false;
        }

        if (!addressInfo.addressName || !addressInfo.cell || !addressInfo.zip || !addressInfo.addr1) {
            alert('배송지 정보를 모두 입력해주세요.');
            return false;
        }

        if (!payType) {
            alert('결제수단을 선택해주세요.');
            return false;
        }

        if (payType === '2') {
            if (!bank) {
                alert('입금은행을 선택해주세요.');
                return false;
            }
            if (!bankName) {
                alert('입금자명을 입력해주세요.');
                return false;
            }
        }

        if (!reconfirm) {
            alert('결제정보를 확인하고 동의해주세요.');
            return false;
        }

        return true;
    };


    const handlePlaceOrder = () => {
        if (!validateForm()) return;

        alert('주문 완료 !');
        navigate('/main');
    };

    const handleDeliveryMemoClick = (value: string) => {
        setDeliveryMemo(value);
        document.querySelector('.order_dlv_memo_list')!.setAttribute('style', 'display:none;')
    };

    const handleAddressSearch = () => {
        new (window as any).daum.Postcode({
            oncomplete: (data: any) => {
                // 선택한 주소 정보를 가져옵니다.
                const fullAddress = data.address; // 전체 주소
                const extraAddress = data.buildingName || ''; // 건물명
                const zoneCode = data.zonecode; // 우편번호

                // 상태 업데이트
                setAddressInfo({
                    ...addressInfo,
                    zip: zoneCode,
                    addr1: `${fullAddress} ${extraAddress}`.trim(),
                });
            },
        }).open();
    };

    return (
        <div id='order'>
            <div className='wrap_inner'>
                <h2 className='subtitle'>주문서</h2>
                <div className='ord_wrap'>
                    <div className='area_left'>
                        {!currentUser && (
                            <div className="guest">
                                <h3 className="title first">비회원 동의</h3>
                                <label className="ckbox">
                                    <input type="checkbox" 
                                        name="agree_guest_order" 
                                        id="agree_guest_order" 
                                        checked={agreeGuestOrder} 
                                        onChange={(e) => setAgreeGuestOrder(e.target.checked)} 
                                    />
                                    비회원 개인정보 수집·이용 동의에 대한 내용을 확인하였으며 이에 동의합니다.
                                </label>
                                <div className="box">
                                    <dl>
                                        <dt>수집하는 개인정보 항목</dt>
                                        <dd>이름, 주소, 전화번호, 이메일, 결제 정보</dd>
                                    </dl>
                                    <dl>
                                        <dt>수집 및 이용목적</dt>
                                        <dd>비회원 구매서비스 제공</dd>
                                    </dl>
                                    <dl>
                                        <dt>보유 및 이용기간</dt>
                                        <dd>원칙적으로, 개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관계 법령에 따라 개인정보를 보존해야 하는 경우, 회사는 해당 법령에서 정한 기간동안 보관합니다.<br/>※ 동의를 거부할 수 있으나 거부 시 비회원 구매서비스 이용이 불가능합니다.</dd>
                                    </dl>
                                </div>
                            </div>
                        )}
                        <h3 className="title first line " >주문상품 <span>{totalQuantity}</span></h3>
                        <div className="box_cart">
					        <div className="enterprise headY">
                                <div className="tbl_col prd">
                                    <ul className="thead">
                                        <li style={{ width: "90px" }}></li>
                                        <li>상품정보</li>
                                        <li style={{ width: "12%" }}>적립금</li>
                                        
                                        <li style={{ width: "12%" }}>총 금액</li>
                                    </ul>
                                    {orderItems.length > 0 ? (
                                        <>
                                            {orderItems.map((item) => (
                                                <ul className='tbody' key={item.id}>
                                                    <li className="prdimg">
                                                        <div className="img">
                                                            <img src={item.image} alt={item.title} />
                                                        </div>
                                                    </li>
                                                    <li className="prd tal">
                                                        <p className="name">{item.title}</p>
                                                        <p className="prc">${item.price}</p>
                                                        <p className="txt_gray">{item.quantity || 1}개</p>
                                                    </li>
                                                    <li><span className="m_txt">적립금 : </span> {Math.floor(item.price * 0.1)} point</li>
                                                    <li className="total"><div><span className="m_txt">총 금액</span> <strong>${item.price * (item.quantity || 1)}</strong></div></li>
                                                </ul>
                                            ))}
                                            {/* <div className="order-summary">
                                                <p>총 주문 개수: {totalQuantity}개</p>
                                                <p>총 주문 금액: ${totalPrice}</p>
                                                <button onClick={handlePlaceOrder}>구매하기</button>
                                            </div> */}
                                        </>
                                    ) : (
                                        <p>주문할 상품이 없습니다.</p>
                                    )}
                                </div>
                            </div>
					        <div className="cart_btn">
						        <p className="msg">※ 상품의 옵션 및 수량 변경은 상품상세 또는 장바구니에서 가능합니다.</p>
                                <div className="btn">
                                    <span className="box_btn grline radius"><Link to="/cart">장바구니 가기</Link></span>
                                </div>
					        </div>
                            <h3 className="title line " >주문자 정보</h3>           
                            <div>
                                <ul className="input_wrap order_buyer_info_write">
                                    <li>
                                        <div className="label">주문하시는 분</div>
                                        <div className="input_box">
                                            <input 
                                                type="text" 
                                                name="buyer_name" 
                                                value={buyerInfo.name} 
                                                id="order_buyer_name" 
                                                onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })} 
                                                className="form_input block" 
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="label">휴대폰번호</div>
                                        <div className="input_box">
                                            <input 
                                                type="text" 
                                                name="buyer_cell" 
                                                id="buyer_cell" 
                                                value={buyerInfo.cell}
                                                onChange={(e) => setBuyerInfo({ ...buyerInfo, cell: e.target.value })}
                                                className="form_input block" 
                                            />
                                        </div>
                                    </li>
                                    <li>
                                        <div className="label">이메일</div>
                                        <div className="input_box">
                                            <input 
                                                type="text" 
                                                name="buyer_email" 
                                                value={buyerInfo.email} 
                                                id="order_buyer_email"
                                                onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
                                                className="form_input block" 
                                            />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            
                            <h3 className="title line">배송지 정보 </h3>
                            <ul className="input_wrap order_addr_info_write">
                                <li id="addr_N">
                                    <div className="label">받으시는 분</div>
                                    <div className="input_box">
                                        <input 
                                            type="text" 
                                            name="addressee_name" 
                                            value={addressInfo.addressName} 
                                            id="order_addressee_name"
                                            onChange={(e) => setAddressInfo({ ...addressInfo, addressName: e.target.value })}
                                            className="form_input block"  
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="label">휴대폰번호</div>
                                    <div className="input_box">
                                        <input 
                                            type="text" 
                                            name="addressee_cell" 
                                            value={addressInfo.cell}
                                            max-length="11" 
                                            id="addressee_cell" 
                                            onChange={(e) => setAddressInfo({ ...addressInfo, cell: e.target.value })}
                                            className="form_input block"  
                                        />
                                    </div>
                                </li>
                                <li className="addr" >
                                    <div className="label">주소</div>
                                    <div className="input_box nowrap">
                                        <input 
                                            type="text" 
                                            name="addressee_zip" 
                                            value={addressInfo.zip} 
                                            id="order_addressee_zip" 
                                            readOnly
                                            className="form_input block" 
                                        />
                                        <span className="box_btn gray large">
                                            <button
                                                type='button'
                                                onClick={handleAddressSearch}
                                                className="btn_search_address"
                                            >우편번호 찾기</button>
                                        </span>
                                    </div>
                                    <div className="input_box">
                                        <input 
                                            type="text" 
                                            name="addressee_addr1" 
                                            value={addressInfo.addr1}
                                            readOnly
                                            className="form_input block" 
                                        />
                                    </div>
                                    <div className="input_box">
                                        <input 
                                            type="text" 
                                            name="addressee_addr2" 
                                            value={addressInfo.addr2}
                                            onChange={(e) => setAddressInfo({ ...addressInfo, addr2: e.target.value })}
                                            className="form_input block" 
                                        />
                                    </div>
                                </li>
					            <li>
						            <div className="label">배송메세지</div>
						            <div className="input_box order_dlv_msg">
                                        <input 
                                            type="text" 
                                            name="dlv_memo" 
                                            value={deliveryMemo}
                                            onClick={() => document.querySelector('.order_dlv_memo_list')!.setAttribute('style', 'display:block;')} 
                                            id="order_dlv_memo" 
                                            className="form_input block" 
                                            placeholder="요청사항 직접 입력" 
                                            readOnly
                                        />
                                        <ul className="order_dlv_memo_list" style={{display: "none"}}>
                                            <li><p onClick={() => handleDeliveryMemoClick('부재 시 문 앞에 놓아주세요.')}>부재 시 문 앞에 놓아주세요.</p></li>
                                            <li><p onClick={() => handleDeliveryMemoClick('부재 시 경비실에 맡겨 주세요.')}>부재 시 경비실에 맡겨 주세요.</p></li>
                                            <li><p onClick={() => handleDeliveryMemoClick('부재 시 전화 또는 문자 주세요.')}>부재 시 전화 또는 문자 주세요.</p></li>
                                            <li><p onClick={() => handleDeliveryMemoClick('택배함에 넣어 주세요.')}>택배함에 넣어 주세요.</p></li>
                                            <li><p onClick={() => handleDeliveryMemoClick('배송 전에 연락해 주세요.')}>배송 전에 연락해 주세요.</p></li>
                                        </ul>
                                    </div> 
					            </li>
				            </ul>

                            <h3 className="title line " >결제수단</h3>
                            <div className="method " >
                                <ul className="pay_type_list">
                                    <li>
                                        <input 
                                            type="radio" 
                                            name="pay_type" 
                                            id="pay_type2" 
                                            value="2"
                                            onChange={(e) => setPayType(e.target.value)}
                                        />
                                        <label htmlFor="pay_type2" className="pay_label">무통장 입금</label>
                                    </li>
                                </ul>
                                
                                <div id="bank_info" >
                                    <ul className="input_wrap">
                                        <li>
                                            <div className="label">입금은행</div>
                                            <div className="input_box">
                                                <span id="bank_list_span">
                                                    <select 
                                                        name="bank"
                                                        value={bank}
                                                        onChange={(e) => setBank(e.target.value)}
                                                    >
                                                        <option value="">:: 입금은행 선택::</option>
                                                        <option value="1">국민은행 123456789 홍길동</option>
                                                    </select>
                                                </span>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="label">입금자명</div>
                                            <div className="input_box">
                                                <input 
                                                    type="text" 
                                                    name="bank_name" 
                                                    className="form_input block" 
                                                    max-length="30"
                                                    value={bankName}
                                                    onChange={(e) => setBankName(e.target.value)}
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <p className="msg">* 주문신청 후 <strong className="point_color">7</strong>일 이내에 입금 확인이 되지 않으면 자동취소 됩니다.</p>
				            </div>
				        </div>
                    </div>

                    <div className="area_right">
                        <div className="inner">
                            <div className="box">
                                <h3 className="title first">결제금액</h3>
                                <div className="prc_order member_off">
                                    <dl>
                                        <dt>주문금액</dt>
                                        <dd>${totalPrice}</dd>
                                    </dl>
                                    <dl>
                                        <dt>배송비 </dt>
                                        <dd><span id="delivery_prc2">0</span>원</dd>
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
                                    <dl className="use_milage_field" >
                                        <dt>적립금 사용</dt>
                                        <dd>- <span className="use_milage_prc">0</span>원</dd>
                                    </dl>
                                    <div className="total_prc">
                                        <dl className="">
                                            <dt>결제금액</dt>
                                            <dd className="p_color">
                                                $<span className="order_info_sale_prc">{totalPrice}</span>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <label className="reconfirm">
                                    <input 
                                        name="reconfirm" 
                                        id="reconfirm" 
                                        type="checkbox"
                                        value="Y"
                                        checked={reconfirm}
                                        onChange={(e) => setReconfirm(e.target.checked)} 
                                    />
                                    결제정보를 확인하였으며, 구매진행에 동의합니다.
                                </label>
                            </div>
                            <div id="order3">
                                <label className="btn_pay box_btn huge block">
                                    <span onClick={handlePlaceOrder}>
                                        {/* <input type="submit" value="" className="dn" /> */}
                                        $ <span className="order_info_sale_prc">{totalPrice}</span> 결제하기
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default Order;