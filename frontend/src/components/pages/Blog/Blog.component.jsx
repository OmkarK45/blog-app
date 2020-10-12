import React, { useEffect, useState } from "react";
import { Text, Heading, Box, Flex, Grid, Image } from "@chakra-ui/core";
import ChakraUIRenderer, { defaults } from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import theme from "../../../themes/theme";
import Skeleton from "react-loading-skeleton";

import "./Blog.styles.scss";
const Blog = ({
  location: {
    state: {
      props: { data },
    },
  },
}) => {
  const [image, setImageURL] = useState("");
  const handleImageLoad = () => {
    setImageURL("loaded");
  };
  const customMDTheme = {
    heading: (props) => {
      const { children } = props;
      return (
        <Heading as="h2" fontSize={"1rem"}>
          {children}
        </Heading>
      );
    },
    ...defaults,
  };

  return (
    <React.Fragment>
      <Box maxW={["100%", "95%"]} margin={["0 auto"]}>
        <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 75ch 1fr"]} gap={2}>
          <Box
            w="100%"
            h="10"
            display={["none", "none", "none", "block"]}
            border="1px solid black"
          />
          {/* Main Blog Column */}
          <Box
            w="100%"
            margin={["1.4rem 0"]}
            id="container"
            backgroundColor={theme.colors.white}
            boxShadow="0 0 0 1px rgba(8,9,10,0.1)"
            borderRadius="10px"
          >
            <Box overflow="hidden">
              {!image && <Skeleton height="280px" width="100%" />}
              {data.bannerURL ? (
                <Image
                  src={data.bannerURL}
                  onLoad={handleImageLoad}
                  w="100%"
                  maxH="280px"
                  objectFit="cover"
                  borderRadius="5px"
                />
              ) : (
                ""
              )}
            </Box>
            <Box padding={["0 0.3rem", "0 .7rem", "0 3rem"]}>
              <Heading
                fontSize={["2.25rem", "3rem"]}
                marginTop={["2rem", "0.7rem", "0.3rem"]}
              >
                {data.title}
              </Heading>
              {/* User data here */}
              <Flex></Flex>
              <ReactMarkdown
                renderers={ChakraUIRenderer(customMDTheme)}
                source={data.content}
                escapeHtml={false}
              />
            </Box>
          </Box>
          <Box
            w="100%"
            h="10"
            display={["none", "none", "none", "block"]}
            border="1px solid black"
          />
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Blog;
