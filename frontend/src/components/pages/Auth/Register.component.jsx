import React, { useState, useContext } from "react";
import userContext from "../../../context/userContext";
import { Link, useHistory } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
  Input,
  useToast,
  Heading,
  Button,
} from "@chakra-ui/core";
import theme from "../../../themes/theme";
import axios from "axios";
import SEO from "./../../common/SEO/SEO.component";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState("");
  const { setUserData } = useContext(userContext);
  const toast = useToast();

  const history = useHistory();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleAvatar = (e) => {
    setAvatar(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const registerCreds = { email, password, username, avatar };
    const loginCreds = { email, password };
    await axios
      .post(process.env.REACT_APP_BACKEND + "/user/register", registerCreds)
      .then((res) => {
        if (res.status === 200) {
          toast({ title: "Registerd!", isClosable: true });
          history.push("/");
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: err.msg,
          status: "error",
        });
        history.push("/register");
      });
    axios
      .post(process.env.REACT_APP_BACKEND + "/user/login", loginCreds)
      .then((res) => {
        setUserData({
          token: res.data.token,
          user: res.data.user,
        });
        if (res.data.error) {
          history.push("/user/register");
        } else {
          history.push("/");
        }
      })
      .catch((err) => {
        toast({
          title: "Error!",
          description: err.response.data.error,
        });
        history.push("/user/register");
      });
  };

  return (
    <React.Fragment>
      <SEO title="Register." />
      <Flex justifyContent="center">
        <Box
          w={["90%", "70%", "60%", "38%", "28%"]}
          border="1px solid #eee"
          marginTop={["2rem", "2rem", "4rem", "2rem"]}
          padding="2rem"
          borderRadius="15px"
          backgroundColor="white"
        >
          <Box margin="0 auto">
            <Heading fontFamily={theme.fonts.body} letterSpacing="-.05em">
              Register.
            </Heading>
          </Box>
          <form onSubmit={handleSubmit}>
            <FormControl marginTop="2rem">
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                type="text"
                id="username"
                isRequired={true}
                name="username"
                value={username}
                onChange={handleUsername}
              />
            </FormControl>

            <FormControl marginTop="2rem">
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                type="email"
                id="email"
                isRequired={true}
                name="email"
                value={email}
                onChange={handleEmail}
              />
            </FormControl>

            <FormControl marginTop="2rem">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                name="password"
                isRequired={true}
                value={password}
                onChange={handlePassword}
              />
            </FormControl>

            <FormControl marginTop="2rem">
              <FormLabel htmlFor="avatar">Avatar URL (Direct Link)</FormLabel>
              <Input
                type="url"
                id="avatar"
                name="avatar"
                value={avatar}
                onChange={handleAvatar}
              />
            </FormControl>
            <Button
              type="submit"
              w="100%"
              color="white"
              _hover={{ color: "white" }}
              backgroundColor={theme.colors.primary}
              backgroundImage={theme.colors.gradient}
              marginTop="1.5rem"
            >
              Register
            </Button>
          </form>
          <Box marginTop="1rem">
            Already have an account ?
            <Link to="/user/login">
              <Text color={theme.colors.accent}>Login Here.</Text>
            </Link>
          </Box>
        </Box>
      </Flex>
    </React.Fragment>
  );
};

export default Register;
