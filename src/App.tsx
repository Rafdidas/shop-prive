import { Routes, Route, Navigate, } from "react-router-dom";

import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Main from "./routes/main/main.component";
import Detail from "./routes/detail/detail.component";
import Cart from "./routes/cart/cart.component";
import AuthPage from "./routes/authenticaion/authenticaion.component";
import Order from "./routes/order/order.component";
import ScrollToTop from "./components/scrollToTop/scroll-to-top.component";

import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { fetchProducts } from "./store/products/products.action";
import { onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { fetchCurrentUser } from "./store/user/user.slice";
import OrderFinish from "./routes/order-finish/order-finish.component";

const App: FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    //dispatch(AuthChanges());
    dispatch(fetchProducts({ page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        console.log('User signed in:', user);
        dispatch(fetchCurrentUser()); // 유저 정보 갱신
      } else {
        console.log('User signed out');
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    
    <>
      <ScrollToTop /> {/* 이 위치에서 모든 경로 변경에 대해 스크롤 초기화 */}
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Navigate to="main" replace />} />
          <Route path="main" element={<Main />} />
          <Route path="sign-in" element={<AuthPage />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Shop />} />
          <Route path="shop/:category/:productId" element={<Detail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="order-fin" element={<OrderFinish />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
