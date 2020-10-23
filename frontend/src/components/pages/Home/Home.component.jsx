import React, { useContext } from "react";
import { Button, Flex } from "@chakra-ui/core";
import { Box } from "@chakra-ui/core";
import { Heading, Text } from "@chakra-ui/core";
import "./Home.styles.scss";
import theme from "../../../themes/theme";
import { Link } from "react-router-dom";
import home from "../../../assets/Images/bg.jpg";
import userContext from "../../../context/userContext";
import SEO from "./../../common/SEO/SEO.component";
import { AiFillCalculator } from "react-icons/ai";

const Home = (props) => {
  const { userData } = useContext(userContext);

  return (
    <React.Fragment>
      <SEO
        title="Welcome! | Semicolon;"
        content="Explore or write your own blog very easily! Just a signup required or explore blogs written by experts and loved by users."
      />
      <Box
        className="banner"
        display="flex"
        backgroundColor={theme.colors.white}
        justifyContent="center"
        position="relative"
        minH={["82vh", "91vh"]}
        // alignItems={["center", "center"]}
      >
        <Flex>
          <Box
            className="ok"
            display="flex"
            flexDirection="column"
            padding="0 1rem"
            marginTop={["3rem", "7rem"]}
          >
            <Text
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: theme.fontWeights.bold,
                letterSpacing: "-.05em",
              }}
              fontSize={["3.5rem", "6xl", "6xl", "5.5rem"]}
              textAlign={["center", "left"]}
              className="landing-text"
            >
              Express your story.
            </Text>
            <Flex mt="3rem" justifyContent={["center", ""]}>
              {userData.user ? (
                ""
              ) : (
                <Link to="/user/login">
                  <Button
                    textTransform="uppercase"
                    marginRight="5"
                    backgroundColor={theme.colors.black}
                    backgroundImage={theme.colors.gradient}
                    color="white"
                    padding="15px 25px"
                    fontSize="1.3rem"
                    fontWeight="400"
                    fontFamily="inherit"
                    letterSpacing="-.03rem"
                    _hover="color:black"
                  >
                    Login
                  </Button>
                </Link>
              )}
              <Link to="/blogs">
                <Button
                  textTransform="uppercase"
                  padding="15px 25px"
                  fontSize="1.3rem"
                  fontWeight="400"
                  letterSpacing="-.03rem"
                >
                  Explore
                </Button>
              </Link>
            </Flex>
            <Box
              position="absolute"
              bottom={["-1px", "0"]}
              left="50%"
              transform="translateX(-50%)"
              margin="0 auto"
              padding="1rem 0"
              width={['80%', '55%']}
            >
              <Text
                marginBottom="1rem"
                fontFamily={theme.fonts.body}
                textAlign="center"
              >
                Proudly made in India
              </Text>
              <Flex justifyContent="center">
                <a
                  style={{ display: "inline-block" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/omkark45/"
                >
                  About this project.
                </a>
                <a
                  style={{ display: "inline-block", marginLeft: "1rem" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/omkark45/blog-app"
                >
                  Source Code.
                </a>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default Home;
