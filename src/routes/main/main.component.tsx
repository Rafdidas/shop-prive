import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import MainVisual0 from '../../assets/main_visual.png'; 

import './main.styles.scss';


const Main = () => {
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
        </div>
    )
}

export default Main;