import './footer.styles.scss'

import { Link } from 'react-router-dom';

import InstaIcon from '../../assets/sns_insta.png';
import FaceIcon from '../../assets/sns_facebook.png';
import NaverIcon from '../../assets/sns_naver.png';


const Footer = () => {
    return (
        <footer>
            <div className='ft_top'>
                <div className="wrap_inner3">
                    <ul className="menu">
                        <li><Link to='/'>회사소개</Link></li>
                        <li><Link to='/'>이용안내</Link></li>
                        <li><Link to='/'>이용약관</Link></li>
                        <li><Link to='/'>개인정보처리방침</Link></li>
                    </ul>
                </div>
            </div>
            <div className='ft_btm'>
                <div className='wrap_inner3'>
                    <ul className="box_wrap">
                        <li>
                            <h3 >CONTACT US</h3>
                            <div className="cont" >
                                <strong><a href="12345678">12345678</a></strong>
                                10AM~6PM (LUNCH 12PM~1PM)<br/>SAT, SUN, HOLIDAY OFF
                            </div>
                        </li>
                        <li>
                            <h3 >BANKING</h3>
                            <div className="cont" >
                                <ul className="bank">
                                    <li><span>국민은행</span> 123456789 홍길동</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                    <div className="info_wrap">
                        <address className="info">
                            <span className="bar">상호 : PRIVE</span>
                            <span>대표 : 홍길동</span>
                            <span className="bar">이메일 : <a href="mailto:abc@example.com">abc@example.com</a></span><br/>
                            <span>전화 : <a href="12345678">12345678</a></span>
                            <span>주소 : 서울 강남구 00동 1층</span><br/>
                            <span>사업자등록번호 : 1234567890 </span>
                            <span>통신판매신고 : 서울0000호</span><br/>
                            <span>고객님은 안전거래를 위해 현금으로 결제 시 저희 쇼핑몰에 가입한 구매안전서비스를 이용하실 수 있습니다.</span>
                        </address>
                    </div>
                    <ul className="share">
                        <li>
                            <img src={InstaIcon} alt="InstaIcon" />
                        </li>
                        <li>
                            <img src={FaceIcon} alt="FaceIcon" />
                        </li>
                        <li>
                            <img src={NaverIcon} alt="NaverIcon" />
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;