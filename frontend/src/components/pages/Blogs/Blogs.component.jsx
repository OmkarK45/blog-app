import React, { useEffect, useState } from "react";
import axios from "axios";
import useAxios from "axios-hooks";
import {
  List,
  ListItem,
  ListIcon,
  Heading,
  Button,
  Flex,
  Grid,
  Box,
  Text,
} from "@chakra-ui/core";
import BlogCard from "./../BlogCard/BlogCard.component";
import theme from "../../../themes/theme";
import './Blogs.styles.scss'

const Blogs = () => {
  //   const [blogsList, setBlogsList] = useState();
  const [{ data, loading, error }, refetch] = useAxios("/blogs");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;
  console.log(data);

  return (
    <div>
      <Grid
        margin="0 auto"
        maxW={["99%", "90%", "95%", "99%"]}
        padding={["1rem", "0.4rem", "0.3rem", "0.7rem"]}
        // templateColumns="1fr 70ch 1fr"
        templateColumns={["1fr", "1fr", "1fr", "1fr 60ch 1fr", "1fr 70ch 1fr"]}
        gap={2}
      >
        <Box w="100%" h="10" border='1px solid #eee' className="sidebar" />
        <Box>
            <Heading fontFamily={theme.fonts.body} marginTop='1rem'>Trending Blogs</Heading>
          <Flex direction="column">
            <Box w="100%" margin="1rem 0">
              {data.blogs ? (
                <Box>
                  {data.blogs &&
                    data.blogs.map((b) =><BlogCard data={b}/>).reverse()}
                </Box>
              ) : (
                <Heading>No Blogs found.</Heading>
              )}
            </Box>
          </Flex>
        </Box>
        <Box w="100%" h="10" border='1px solid #eee' className="tag-list" />
      </Grid>
    </div>
  );
};

export default Blogs;
