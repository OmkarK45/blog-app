import React, { useContext } from "react";
import userContext from "../../../context/userContext";
import "./Header.styles.scss";
import { Heading, Flex, Box, Text, Button, useToast } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import theme from "../../../themes/theme";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  const { userData, setUserData } = useContext(userContext);
  const history = useHistory();
  const toast = useToast();
  const logout = () => {
    toast({
      title: "Successfully logged out.",
      status: "info",
    });
    setUserData({
      token: undefined,
      user: undefined,
    });
    history.push("/");
    localStorage.setItem("auth-token", "");
    localStorage.setItem("x-auth-token", "");
  };
  return (
    <React.Fragment>
      <Box position='fixed' width='100%'>
      <header className="header" style={{backgroundColor:'white'}}>
        <nav className="nav">
          <ul className="logo">
            <li>
              <Heading
                style={{ fontFamily: theme.fonts.body, fontWeight: 400 }}
              >
                <Link to="/">Blog.</Link>
              </Heading>
            </li>
          </ul>
          <ul className="links">
            <Link to="/blogs">Explore</Link>
            {/* Add userData.user !== undefined on below line to enable user auth */}
            {userData.user  ? (
              <Box>
                <Button
                  padding={["0.3rem", "1rem"]}
                  backgroundColor={theme.colors.accent}
                  maxW='7rem'
                  margin='0 1rem'
                  color='white'
                >
                  {" "}
                  <Link to="/blogs/new">
                    <Flex>
                      <AiOutlineFileAdd />
                      <Text marginLeft="0.3rem" >New Blog</Text>
                    </Flex>
                  </Link>
                </Button>
                <Button onClick={logout}>Log out</Button>
              </Box>
            ) : (
              <>
                <Link to="/user/login">
                  <button className="btn">Login</button>
                </Link>
                <Link to="/user/register">Register</Link>
              </>
            )}
          </ul>
        </nav>
      </header>
      </Box>
    </React.Fragment>
  );
};

export default Header;
