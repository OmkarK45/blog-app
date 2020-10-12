import React, { useEffect, useState } from "react";
import { Text, Heading, Box, Flex, Grid } from "@chakra-ui/core";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

const Blog = ({
  location: {
    state: {
      props: { data },
    },
  },
}) => {
  const input = "# This is a header\n\nAnd this is a paragraph";
  return (
    <React.Fragment>
      <Box maxW={["95%"]} margin={["0 auto"]}>
        <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 75ch 1fr"]} gap={2}>
          <Box
            w="100%"
            h="10"
            display={["none", "none", "none", "block"]}
            border="1px solid black"
          />
          {/* Main Blog Column */}
          <Box w="100%" id="container">
            {/* {data.title} */}
            <ReactMarkdown
              renderers={ChakraUIRenderer()}
              source={data.content}
              escapeHtml={false}
            />
            
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
