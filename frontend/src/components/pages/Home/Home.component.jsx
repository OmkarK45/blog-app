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
        minH="91vh"
        display="flex"
        backgroundColor={theme.colors.white}
        justifyContent="center"
      >
        <Flex marginTop={["4rem", "10rem"]} justifyContent={["center", ""]}>
          <Box padding="0 1rem" margin="0 auto">
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
          </Box>
        </Flex>
      </Box>
    </React.Fragment>
  );
};

export default Home;
