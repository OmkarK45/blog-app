import React from "react";
import { Heading, Box, Text, Flex, Grid, Image } from "@chakra-ui/core";
import theme from "../../../themes/theme";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./BlogCard.styles.scss";

const BlogCard = (props) => {
  const fallbackImageURL =
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1007&q=80";

  return (
    <Box
      maxH="400px"
      margin="1rem 0"
      border="1px solid #eee"
      overflow="hidden"
      borderRadius="10px"
      backgroundColor="white"
      boxShadow="0 0 0 1px rgba(8,9,10,0.1)"
    >
      <Box>
        <Flex direction="column">
          <Box overflow="hidden">
            <Image
              src={
                props.data.bannerURL ? props.data.bannerURL : fallbackImageURL
              }
              height="200px"
              width="100%"
              objectFit="cover"
              className="blog-banner"
            />
          </Box>
          <Flex direction="column" padding="1rem 1.5rem">
            <Heading
              fontSize={['1.5rem', '1.8rem']}
              fontFamily={theme.fonts.heading}
              fontWeight={theme.fontWeights.bold}
            >
              {/* Add Link tag surrounding this. */}
              {props.data.title}
            </Heading>
            <Box marginTop="0.7rem">
              <Flex alignItems="center">
                <Box borderRadius="50%">
                  <HiOutlineUserCircle size="32px" />
                </Box>
                <Text
                  color="#4d5760"
                  fontFamily={theme.fonts.heading}
                  marginLeft="0.7rem"
                >
                  {props.data.authorID}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default BlogCard;
