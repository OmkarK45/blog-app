import React, { useContext } from "react";
import { Button, Flex } from "@chakra-ui/core";
import { Box } from "@chakra-ui/core";
import { Heading, Text } from "@chakra-ui/core";
import "./Home.styles.scss";
import theme from "../../../themes/theme";
import { Link } from "react-router-dom";
import home from "../../../assets/Images/bg.jpg";
import userContext from "../../../context/userContext";

const Home = (props) => {
  const { userData } = useContext(userContext);

  return (
    <React.Fragment>
      <Box
        className="banner"
        minH={["82vh", "91vh"]}
        display="flex"
        backgroundColor={theme.colors.white}
        justifyContent="center"
        position="relative"
      >
        <Flex marginTop={["4rem", "10rem"]} justifyContent={["center", ""]}>
          <Box
            className="ok"
            display="flex"
            flexDirection="column"
            padding="0 1rem"
            margin="0 auto"
          >
            <Text
              style={{
                fontFamily: theme.fonts.body,
                fontWeight: theme.fontWeights.bold,
              }}
              fontSize={["5xl", "6xl", "6xl", "6xl"]}
              className="landing-text"
            >
              Express your story.
            </Text>
            <Text
              style={{
                fontSize: theme.fontSizes["3xl"],
                fontFamily: theme.fonts.body,
                fontWeight: theme.fontWeights.light,
              }}
            >
              Publish your first blog.
            </Text>
            <Box mt="2rem">
              {userData.user ? (
                ""
              ) : (
                <Button
                  textTransform="uppercase"
                  marginRight="5"
                  backgroundColor={theme.colors.primary}
                  color="white"
                  _hover="color:black"
                >
                  <Link to="/user/login">Login</Link>
                </Button>
              )}

              <Button textTransform="uppercase">
                <Link to="/blogs">Explore Blogs</Link>
              </Button>
            </Box>
            <Box
              position="absolute"
              bottom={["-1px", "0"]}
              left="50%"
              transform="translateX(-50%)"
              margin="0 auto"
              padding="1rem 0"
              width='90%'
            >
              <Text
                marginBottom="1rem"
                fontFamily={theme.fonts.body}
                textAlign="center"
              >
                Proudly made in India
              </Text>
              <Flex justifyContent='center'>
                <a
                style={{display:'inline-block',}}
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.linkedin.com/in/omkark45/"
                >
                  About this project.
                </a>
                <a
                style={{display:'inline-block', marginLeft:'1rem'}}
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
