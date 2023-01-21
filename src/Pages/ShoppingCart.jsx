import React, { useState, useEffect } from "react";
import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import { mobile } from "../responsive";
import Button from "@mui/material/Button";
import Navbar from "../Components/Navbar";

export default function ShoppingCart() {
    //const [cart, setCart] = useState();
    const [cartProducts, setCartProducts] = useState();

    const userId = localStorage.getItem("user");

    const deleteFromShoppingCart = (id) => {
        fetch(`http://localhost:8000/carts/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProductsById = (cart) => {
        let ids = "";
        for (let cartMiniObject of cart) {
            ids += `id=${cartMiniObject.productId}&`;
        }
        fetch(`http://localhost:8000/products?${ids}`, {
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

    const getCart = () => {
        fetch(`http://localhost:8000/user/${JSON.parse(userId).id}/carts`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                getProductsById(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getCart();
    }, [userId]);

    return (
        <div>
            <Navbar />
            <Container>
                <Wrapper>
                    <Title>Your Shopping Cart</Title>
                    <Top>
                        <Button
                            variant="contained"
                            size="large"
                            style={{ backgroundColor: "#37a0ff" }}
                        >
                            Continue Shopping
                        </Button>
                        <TopTexts>
                            <TopText>Shopping Cart({cartProducts && cartProducts.length})</TopText>
                        </TopTexts>
                        <Button
                            variant="contained"
                            size="large"
                            style={{ backgroundColor: "#056205" }}
                        >
                            Checkout Now
                        </Button>
                    </Top>
                    <Bottom>
                        <Info>
                            {cartProducts &&
                                cartProducts.map((element) => {
                                    return (
                                        <div key={element.id}>
                                            <Product>
                                                <ProductDetail>
                                                    <Image src={element.photos[0]} />
                                                    <Details>
                                                        <ProductName>
                                                            <b>Product:</b> {element.title}
                                                        </ProductName>
                                                        <ProductDescription>
                                                            <b>Description:</b>{" "}
                                                            {element.description}
                                                        </ProductDescription>
                                                        <ProductCategory>
                                                            <b>Category:</b> {element.category}
                                                        </ProductCategory>
                                                    </Details>
                                                </ProductDetail>
                                                <PriceDetail>
                                                    <ProductReviewContainer>
                                                        <Review>Review: {element.review}</Review>
                                                    </ProductReviewContainer>
                                                    <ProductPrice>$ {element.price}</ProductPrice>
                                                </PriceDetail>
                                                <ProductDelete>
                                                    <Button
                                                        variant="contained"
                                                        type="delete"
                                                        size="large"
                                                        style={{ backgroundColor: "red" }}
                                                        onClick={() => {
                                                            deleteFromShoppingCart(element.id);
                                                        }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </ProductDelete>
                                            </Product>
                                        </div>
                                    );
                                })}
                        </Info>
                    </Bottom>
                </Wrapper>
            </Container>
        </div>
    );
}

const Container = styled.div``;

const Wrapper = styled.div`
    padding: 50px;
    ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`;

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;
const TopTexts = styled.div`
    ${mobile({ display: "none" })}
`;
const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0px 10px;
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
    flex: 3;
    padding: 50px;
    border-radius: 20px;
    box-shadow: 0px -25px 32px rgba(82, 130, 255, 0.09);
`;

const Product = styled.div`
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 8px 21px rgba(82, 130, 255, 0.15);
    margin: 20px;
    border-radius: 20px;
    padding: 30px;
    ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`;

const Image = styled.img`
    width: 100px;
`;

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductDescription = styled.span``;
const ProductCategory = styled.span``;

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductDelete = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProductReviewContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`;

const Review = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 200;
    ${mobile({ marginBottom: "20px" })}
`;
