import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import MainVisual0 from '../../assets/main_visual.png'; 
import MidBnr0 from '../../assets/mid_bnr0.png';
import MidBnr1 from '../../assets/mid_bnr1.png';
import PromBnr0 from '../../assets/prom_bnr0.png';
import PromBnr1 from '../../assets/prom_bnr1.png';
import PromBnr2 from '../../assets/prom_bnr2.png';

import './main.styles.scss';
import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import ProductCard from "../../components/product-card/product-card.component";
import { Link } from "react-router-dom";


const Main: FC = () => {

    const { products } = useSelector((state: RootState) => state.products);
    const bestProducts = products.slice(0,5);
    const newProducts = products.slice(0,10);

    return (
        <div id="main">
            <div className="main_visual">
                <div className="wrap_inner3">
                    <Swiper
                        pagination={{
                            type: "progressbar",
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        speed={800}
                        loop={true}
                        navigation={false}
                        spaceBetween={30}
                        modules={[Pagination, Autoplay]}
                    >
                        <SwiperSlide>
                            <img src={MainVisual0} alt="Main Visual" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={MainVisual0} alt="Main Visual" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src={MainVisual0} alt="Main Visual" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
            <div className="wrap_inner3">
                {/* best product */}
                <div className="main_title">
                    <h3>BEST PRODUCT</h3>
                </div>
                <div className="best_section">
                    <div className="prd_list">
                    {
                        bestProducts.map((product) => {
                            return (
                                <ProductCard key={product.id} product={product}/>
                            )
                        })
                    }
                    </div>
                </div>
                {/* main text */}
                <div className="main_text">
                    <div className="wrap_inner3">
                        <div className="title">Full-frame performance, made compact</div>
                        <div className="cont">PRIVE는 사람들의 일상 생활에서 사용되는 제품과 경험을 디자인합니다. 우리는 고객들이 편안하고 효율적인 생활을 할 수 있도록, 미래지향적인 기술과 혁신적인 자인을 활용하여 제품을 개발하고 있습니다.</div>
                    </div>
                </div>
                {/* main banner */}
                <div className="main_bnr">
                    <ul className="main_bnr_list">
                        <li>
                            <div className="thum">
                                <img src={MidBnr0} alt="mid banner" />
                            </div>
                            <div className="cont">
                                <div className="desc">EOM SERIES 2</div>
                                <div className="title">일상을 화보처럼, <br/>당신을 아름답게</div>
                                <Link to='/shop/mobile' className="link">보러가기</Link>
                            </div>
                        </li>
                        <li>
                            <div className="thum">
                                <img src={MidBnr1} alt="mid banner" />
                            </div>
                            <div className="cont">
                                <div className="desc">EOM SERIES 2</div>
                                <div className="title">차원이 다른 편안함, <br/>더 작고 가볍게</div>
                                <Link to='/shop/audio' className="link">보러가기</Link>
                            </div>
                        </li>
                    </ul>
                </div>
                {/* new product */}
                <div className="main_title">
                    <h3>NEW PRODUCT</h3>
                </div>
                <div className="best_section">
                    <div className="prd_list">
                    {
                        newProducts.map((product) => {
                            return (
                                <ProductCard key={product.id} product={product}/>
                            )
                        })
                    }
                    </div>
                </div>
                <div className="main_title">
                    <h3>TODAY PROMOTION</h3>
                </div>
                <div className="prom_list">
                    <div className="prom_box">
                        <div className="thum">
                            <img src={PromBnr0} alt="promotion banner" />
                        </div>
                        <div className="cont">
                            <div className="tit">
                                아무 걱정 없이, 더 작고 더 가볍게. 스피커 모음전 ~50%
                            </div>
                            <div className="desc">혁신적인 크기와 무게를 위해 새로운 렌즈를 제시합니다. 일상의 모든 순간이 작품이 됩니다.</div>
                        </div>
                    </div>
                    <div className="prom_box">
                        <div className="thum">
                            <img src={PromBnr1} alt="promotion banner" />
                        </div>
                        <div className="cont">
                            <div className="tit">
                                편안하게 몰입하는 매혹적인 경험, 블루투스 스피커
                            </div>
                            <div className="desc">혁신적인 크기와 무게의 이어폰은 편안하게 착용할 수 있으며, 한번의 탭으로 빠르게 연결됩니다.</div>
                        </div>
                    </div>
                    <div className="prom_box">
                        <div className="thum">
                            <img src={PromBnr2} alt="promotion banner" />
                        </div>
                        <div className="cont">
                            <div className="tit">
                                아무 걱정 없이, 더 작고 더 가볍게. 헤드폰 2세대 출시
                            </div>
                            <div className="desc">특수 설계된 유닛으로 업계 최고의 노이즈 캔슬링을 제공합니다. 사운드 하나하나의 디테일에 몰입할 수 있습니다.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;