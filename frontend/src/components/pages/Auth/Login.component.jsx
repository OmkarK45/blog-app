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
  useToast,
  Text,
  Button,
} from "@chakra-ui/core";

import theme from "../../../themes/theme";
import { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import userContext from "../../../context/userContext";
import SEO from "./../../common/SEO/SEO.component";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserData } = useContext(userContext);
  const toast = useToast();
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
    if (!email || !password)
      return toast({ title: "Please fill all the fields." });
    axios
      .post(process.env.REACT_APP_BACKEND + "/user/login", loginCreds)
      .then((res) => {
        setUserData({
          token: res.data.token,
          user: res.data.user,
          isAdmin: res.data.user.isAdmin,
        });
        localStorage.setItem("x-auth-token", res.data.token);
        // localStorage.setItem("auth-token", res.data.token);

        toast({
          title: "Logged in !",
          status: "success",
        });
        if (res.data.user.isAdmin) {
          history.push("/user/adminPage");
        } else {
          history.push("/blogs");
        }
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: err.response.data.msg,
          isClosable: true,
          status: "warning",
        });
      });
  };

  return (
    <React.Fragment>
      <SEO title="Login." />
      <Flex justifyContent="center">
        <Box
          w={["90%", "70%", "60%", "38%", "28%"]}
          border="1px solid #eee"
          marginTop={["2rem", "2rem", "4rem", "6rem"]}
          padding="2rem"
          borderRadius="15px"
          backgroundColor="white"
        >
          <Box margin="0 auto">
            <Heading fontFamily={theme.fonts.body} letterSpacing="-.05em">
              Login.
            </Heading>
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
              _hover={{ color: "white" }}
              backgroundImage={theme.colors.gradient}
              marginTop="1.5rem"
            >
              Login
            </Button>
          </form>
          <Box marginTop="1rem">
            Don't have an account ?
            <Link to="/user/register">
              <Text color={theme.colors.accent}>Register Here.</Text>
            </Link>
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default Login;
