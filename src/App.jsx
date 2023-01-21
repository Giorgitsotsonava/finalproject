import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Footer from "./Components/Footer";

import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import MainRouteSwitch from "./Pages/MainRouteSwitch";
import Products from "./Pages/Products";
import ShoppingCart from "./Pages/ShoppingCart";

function App() {
    const localStorageIsAuthorised = localStorage.getItem("isAuthorised");
    const [isAuthorised, setIsAuthorised] = useState(localStorageIsAuthorised ? true : false);

    // useEffect(() => {
    //     fetch("http://localhost:8000/users");
    // }, []);

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {isAuthorised && isAuthorised == true ? (
                        <>
                            <Route path="/" element={<MainRouteSwitch />} />
                            <Route path="/products">
                                <Route index element={<Products />} />
                                <Route path=":page" element={<Products />} />
                            </Route>
                            <Route path="/shopping-cart" element={<ShoppingCart />} />
                        </>
                    ) : (
                        <>
                            <Route
                                path="/"
                                element={<Login handleIsAuthorised={setIsAuthorised} />}
                            />
                            <Route path="/signup" element={<SignUp />} />
                        </>
                    )}
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
}

export default App;
