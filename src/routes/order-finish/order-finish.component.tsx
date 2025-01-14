import { FC } from 'react'
import './order-finish.style.scss'
import { Link, useLocation } from 'react-router-dom'
import { CartItem } from '../../store/cart/cart.slice';

interface OrderFinishProps {
    orderId: string;
    buyerEmail: string;
    orderItems: CartItem[];
    addressInfo: {
        addressName: string;
        cell: string;
        zip: string;
        addr1: string;
        addr2: string;
        deliveryMemo: string;
    };
    paymentInfo: {
        method: string;
        bank: string;
        dueDate: string;
    }
    totalAmount: number;
}

const OrderFinish:FC = () => {
    const location = useLocation();
    const state = location.state as OrderFinishProps;

    const {
        orderId,
        buyerEmail,
        orderItems,
        addressInfo,
        paymentInfo,
        totalAmount,
  } = state;
    
    return (
        <div id='orderfin'>
            <h2 className="subtitle">주문완료</h2>
            <div className='wrap_inner'>
                <div className="box_mp">
                    <p className="num">주문번호 : <strong>{orderId}</strong></p>
                    <p className="msg">고객님의 소중한 주문정보를 <strong>{buyerEmail}</strong>로 발송해 드렸습니다.<br/>(비회원으로 주문하신 경우 주문 확인시 주문번호가 필요하오니 꼭 메모해 두세요.)</p>
                </div>

                <div className="tbl_col prd">
                    <ul className="thead">
                        <li style={{width:"90px"}}></li>
                        <li>상품정보</li>
                        <li style={{width:"12%"}}>적립금</li>
                        <li style={{width:"12%"}}>총 금액</li>
                    </ul>
                    {
                        orderItems.map((item) => {
                            return (
                                <ul className="tbody" key={item.id}>
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
                                    <li>
                                        <span className="m_txt">적립금 : </span>{' '}
                                        {Math.floor(item.price * 0.1)} point
                                    </li>
                                    <li className="total">
                                        <div>
                                            <span className="m_txt">총 금액</span>{' '}
                                            <strong>${item.price * (item.quantity || 1)}</strong>
                                        </div>
                                    </li>
                                </ul>
                            )
                        })
                    }
                    
                </div>

                <div className='box_wrap'>
                    <h3 className="title line">배송 정보 </h3>
                    <div className="box_addr">
                        <p id="default_addr_name">{addressInfo.addressName}</p>
                        <p id="default_addr_phone">{addressInfo.cell}</p>
                        <p id="default_addr">[{addressInfo.zip}] {addressInfo.addr1} {addressInfo.addr2}</p>
                        <p className="dlv_msg">{addressInfo.deliveryMemo}</p>
                    </div>
                    <h3 className="title line">결제정보</h3>
                    <div className='box_payment'>
                        <table className="tbl_col_og ord">
                            <colgroup>
                                <col style={{width:"30%"}} />
                                <col />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">총 상품구매금액</th>
                                    <td>${totalAmount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">배송비</th>
                                    <td>0원</td>
                                </tr>
                                <tr>
                                    <th scope="row">총 주문금액</th>
                                    <td>${totalAmount}</td>
                                </tr>
                                <tr>
                                    <th scope="row">총 결제금액</th>
                                    <td><strong className="p_color">${totalAmount}</strong></td> 
                                </tr>
                            </tbody>
                        </table>

                        <table className="tbl_col_og ord">
                            <colgroup>
                                <col style={{width:"30%"}} />
                                <col />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <th scope="row">결제방법</th>
                                    <td>{paymentInfo.method}</td>
                                </tr>
                                <tr>
                                    <th scope="row">입금계좌</th>
                                    <td>
                                        {paymentInfo.bank}
                                        <br/><strong>{paymentInfo.dueDate}</strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='btn'>
                    <span className="box_btn huge white"><Link to='/main'>쇼핑계속하기</Link></span>
                </div>
            </div>
        </div>
    )
}

export default OrderFinish