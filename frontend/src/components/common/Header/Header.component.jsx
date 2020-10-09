import React from "react";
import "./Header.styles.scss";
import { Heading, Flex, Box, Text } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import theme from '../../../themes/theme'


const Header = (props) => {
  return (
    <React.Fragment>
      <header className="header">
        <nav className="nav">
          <ul className="logo">
            <li>
              <Heading style={{fontFamily:theme.fonts.body, fontWeight:400}}><Link to="/">Blog.</Link></Heading>
            </li>
          </ul>
          <ul className="links">
            <Link to="/user/login">
              <button className='btn'>Login</button>
            </Link>
            <Link to="/user/register">Register</Link>
            <Link to="/blogs">Explore</Link>
          </ul>
        </nav>
      </header>
    </React.Fragment>
  );
};

export default Header;
