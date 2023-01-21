import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Navbar = () => {
    const userId = localStorage.getItem("user");
    const [cartProducts, setCartProducts] = useState([]);

    const logout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const getCart = () => {
        fetch(`http://localhost:8000/user/${JSON.parse(userId).id}/carts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setCartProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCart();
    }, []);

    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo>Project</Logo>
                    <MenuItem>Products</MenuItem>
                </Left>
                <Right>
                    <Link to="/shopping-cart">
                        <MenuItem>
                            <Badge badgeContent={cartProducts.length} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </MenuItem>
                    </Link>
                    <MenuItem onClick={logout}>Log Out</MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;

const Container = styled.div`
    height: 80px;
    ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2px solid #888;
    border-radius: 20px;
    margin: 25px;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
