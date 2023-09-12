import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Products from "./pages/Products";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppPage from "./pages/AppLayout.jsx";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="products" element={<Products/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="app" element={<AppPage/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
