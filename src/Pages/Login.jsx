import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Login({ handleIsAuthorised }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8000/login?email=${email}&password=${password}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: "password",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("isAuthorised", "true");
        handleIsAuthorised(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <Container>
      <Wrapper>
        <div style={{ display: "flex" }}>
          <LoginContainer>
            <LeftTitle>Welcome Back!</LeftTitle>
          </LoginContainer>
          <div style={{ width: "50%" }}>
            <Title>Sign In</Title>
            <Form
              className="loginForm"
              method="post"
              action=""
              onSubmit={getUser}
            >
              <TextField
                label="Email"
                value={email}
                variant="outlined"
                onChange={(event) => setEmail(event.currentTarget.value)}
              />
              <TextField
                type="password"
                label="password"
                value={password}
                variant="outlined"
                onChange={(event) => setPassword(event.currentTarget.value)}
                style={{ marginTop: 15, marginBottom: 15 }}
              />
              <Button variant="contained" type="submit" size="large" style={{backgroundColor: "#08ced2"}}>
                Sign In
              </Button>
              <Link
                to="/signup"
                style={{
                  textDecoration: "underline",
                  fontSize: 15,
                  color: "black",
                  marginTop: 20,
                }}
              >
                Don't Have an account? Sign Up
              </Link>
            </Form>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const LoginContainer = styled.div`
  width: 50%;
  background-image: url(https://4kwallpapers.com/images/walls/thumbs_3t/1202.png);
  background-size: cover;
  border-radius: 20px;
  margin-right: 20px;
  text-align: center;
  padding: 100px 0;
`;


const LeftTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: white;
`;