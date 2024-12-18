import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./routes/home/home.component";
import Shop from "./routes/shop/shop.component";
import Main from "./routes/main/main.component";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Navigate to="main" replace />} />
        <Route path="main" element={<Main />} />
        <Route path="shop" element={<Shop />} />
        <Route path="/shop/:category" element={ <Shop /> } />
      </Route>
    </Routes>
  );
}

export default App;
