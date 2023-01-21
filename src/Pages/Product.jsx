import { useState, forwardRef } from "react";
import { OpenInNew, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Product = ({ item }) => {
    const user = localStorage.getItem("user");
    const addToCart = (productId) => {
        fetch("http://localhost:8000/carts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({
                productId: productId,
                userId: `${JSON.parse(user).id}`,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                handleClick();
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [open, setOpen] = useState(false);
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    return (
        <Container>
            <Circle />
            <Image src={item.photos[0]} />
            <Info>
                <Icon
                    onClick={() => {
                        addToCart(item.id);
                    }}
                >
                    <ShoppingCartOutlined />
                </Icon>
                <Icon>
                    <OpenInNew />
                </Icon>
            </Info>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    <SnackbarInfo>
                        <div className="divider">
                            <img src={item.photos[0]} alt="" />
                        </div>
                        <div className="divider">
                            <div>{item.title}</div>
                            <div>Added to Cart</div>
                        </div>
                    </SnackbarInfo>
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Product;

const SnackbarInfo = styled.div`
    display: flex;
    .divider {
        padding: 5px;
    }
    img {
        max-width: 50px;
        max-height: 50px;
    }
`;

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: default;
`;

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info} {
        opacity: 1;
    }
`;

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

const Image = styled.img`
    max-width: 90%;
    max-height: 75%;
    z-index: 2;
`;

const Icon = styled.button`
    border: 0;
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;
