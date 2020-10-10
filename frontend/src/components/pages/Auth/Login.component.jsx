import React, { useContext } from "react";
import { submitService } from "../../../services/authService";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Flex,
  Box,
  Input,
  Heading,
  Button,
} from "@chakra-ui/core";
import theme from "../../../themes/theme";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import userContext from "../../../context/userContext";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(userContext);

  const history = useHistory();
  const handleEmail = (e) => {
    const userEmail = e.target.value;
    setEmail(userEmail);
  };
  const handlePassword = (e) => {
    const userPassword = e.target.value;
    setPassword(userPassword);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginCreds = { email, password };
    axios
      .post("/user/login", loginCreds)
      .then((res) =>
        setUserData({
          token: res.data.token,
          user: res.data.user,
        })
      )
      .catch((error) => console.log(error));
    history.push("/");
  };

  return (
    <React.Fragment>
      <Flex justifyContent="center">
        <Box
          w={["90%", "70%", "60%", "38%", "28%"]}
          border="1px solid #eee"
          marginTop={["2rem", "2rem", "4rem", "6rem"]}
          padding="2rem"
          borderRadius="15px"
        >
          <Box margin="0 auto">
            <Heading>Login.</Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl marginTop="2rem">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                aria-describedby="email-helper-text"
              />
              <FormHelperText id="email-helper-text">
                We'll never share your email.
              </FormHelperText>
            </FormControl>

            <FormControl marginTop="2rem">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handlePassword}
                aria-describedby="email-helper-text"
              />
            </FormControl>
            <Button
              type="submit"
              w="100%"
              color="white"
              _hover={{ color: "black" }}
              backgroundColor={theme.colors.primary}
              marginTop="1.5rem"
            >
              Login
            </Button>
          </form>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default Login;
