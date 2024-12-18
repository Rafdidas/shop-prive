import './detail.styles.scss';

import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDetail } from "../../contexts/detail.context";

const Detail: FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { productDetail, loading, fetchProductDetail } = useDetail();
    useEffect(() => {
        if (productId) {
            fetchProductDetail(productId);
        }
    }, [productId]);

    return (
        <div id="detail">
            <div className="info_wrap">
                <img src={productDetail?.image} alt={productDetail?.title} />
                <h1>{productDetail?.title}</h1>
                <p>가격: ${productDetail?.price}</p>
                <p>{productDetail?.description}</p>
            </div>
        </div>
    );
}

export default Detail;