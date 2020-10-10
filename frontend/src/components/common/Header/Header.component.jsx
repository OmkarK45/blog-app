import React, { useContext } from "react";
import userContext from "../../../context/userContext";
import "./Header.styles.scss";
import { Heading, Flex, Box, Text, Button } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import theme from "../../../themes/theme";

const Header = (props) => {
  const { userData, setUserData } = useContext(userContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <React.Fragment>
      <header className="header">
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
            {userData.user ? (
              <Button onClick={logout}>Log out</Button>
            ) : (
              <>
                <Link to="/user/login">
                  <button className="btn">Login</button>
                </Link>
                <Link to="/user/register">Register</Link>
              </>
            )}

            <Link to="/blogs">Explore</Link>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
