import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import styled from "styled-components";

import {
  Home,
  About,
  AuthWrapper,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Products,
  SingleProduct,
} from "./pages/index";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar/>
      <Routes>
        <Route index element={<Home/>}></Route>
        <Route path="about" element={<About/>}></Route>
        <Route path="products" element={<Products/>}></Route>
        <Route path="cart" element={<Cart/>}></Route>
        <Route path="checkout" element={<Checkout/>}></Route>
        <Route path="*" element={<Error/>}></Route>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
