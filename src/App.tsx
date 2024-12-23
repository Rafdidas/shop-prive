import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Main from "./routes/main/main.component";
import Detail from "./routes/detail/detail.component";
import Cart from "./routes/cart/cart.component";
import AuthPage from "./routes/authenticaion/authenticaion.component";
import Order from "./routes/order/order.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Navigate to="main" replace />} />
        <Route path="main" element={<Main />} />
        <Route path="sign-in" element={<AuthPage />} />
        <Route path="shop" element={<Shop />} />
        <Route path="shop/:category" element={ <Shop /> } />
        <Route path="shop/:category/:productId" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="order" element={<Order />} />
      </Route>
    </Routes>
  );
}

export default App;
