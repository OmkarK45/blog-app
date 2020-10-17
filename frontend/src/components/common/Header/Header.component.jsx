import React, { useContext } from "react";
import userContext from "../../../context/userContext";
import "./Header.styles.scss";
import {
  Heading,
  Flex,
  Box,
  Text,
  Button,
  useToast,
  List,
  ListItem,
} from "@chakra-ui/core";
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
      <Box width="100%">
        <header className="header" style={{ backgroundColor: "white" }}>
          <Flex className="nav" direction={["column", "row"]}>
            <List className="logo" margin={["1rem", "0"]}>
              <ListItem>
                <Heading
                  style={{ fontFamily: theme.fonts.body, fontWeight: 400 }}
                >
                  <Link to="/">Blog.</Link>
                </Heading>
              </ListItem>
            </List>
            <List margin={["0"]} className="links">
              <Link to="/blogs">
                <Text fontWeight="700" fontFamily={theme.fonts.body}>
                  Explore
                </Text>
              </Link>
              {/* Add userData.user !== undefined on below line to enable user auth */}
              {userData.user ? (
                <Box margin={["0", "0 auto"]}>
                  <Button
                    padding={["0.2rem", "1rem"]}
                    backgroundColor="#f1c40f"
                    color="black"
                    maxW="7rem"
                    margin={["0 0.2rem", "0 1rem"]}
                  >
                    {" "}
                    <Link to="/blogs/new">
                      <Flex>
                        <AiOutlineFileAdd />
                        <Text marginLeft="0.3rem"  fontFamily={theme.fonts.body}>
                          New Blog
                        </Text>
                      </Flex>
                    </Link>
                  </Button>
                  <Button onClick={logout}>Log out</Button>
                </Box>
              ) : (
                <>
                  <Link to="/user/register">
                    <Text fontWeight="700" fontFamily={theme.fonts.body}>
                      Register
                    </Text>
                  </Link>
                  <Link to="/user/login">
                    <Button
                      color="white"
                      backgroundColor={theme.colors.primary}
                      _hover={{ color: "black" }}
                    >
                      Login
                    </Button>
                  </Link>
                </>
              )}
            </List>
          </Flex>
        </header>
      </Box>
    </React.Fragment>
  );
};

export default Header;
