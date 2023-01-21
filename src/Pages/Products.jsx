import { useEffect } from "react";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import Product from "./Product";
import Navbar from "../Components/Navbar";

const Products = () => {
    let { page } = useParams();
    const [products, setProducts] = useState();

    const getProducts = () => {
        fetch(`http://localhost:8000/products?_page=${page != undefined ? page : 1}&_limit=9`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getProducts();
    }, [page]);

    return (
        <>
            <Navbar />
            <Container>
                {products && products.map((item) => <Product item={item} key={item.id} />)}
            </Container>
            <Navigation>
                <NavLink to="/products/1">1</NavLink>
                <NavLink to="/products/2">2</NavLink>
                <NavLink to="/products/3">3</NavLink>
            </Navigation>
        </>
    );
};

export default Products;

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 50px;
`;

const Navigation = styled.div`
    display: flex;
    justify-content: center;

    a {
        border: 1px solid #eee;
        text-decoration: none;
        padding: 13px 20px;
        margin: 0px 10px;
        font-size: 22px;
        font-weight: bold;
        color: #666;

        &:active {
            color: #000;
        }

        &:hover {
            background-color: #eee;
            border: 1px solid #ddd;
        }
    }
`;
