import React from "react";
import useAxios from "axios-hooks";
import { Heading, Flex, Grid, Box, Spinner } from "@chakra-ui/core";
import BlogCard from "./../BlogCard/BlogCard.component";
import theme from "../../../themes/theme";
import "./Blogs.styles.scss";
import SEO from "./../../common/SEO/SEO.component";

const Blogs = () => {
  //   const [blogsList, setBlogsList] = useState();
  const [{ data, loading, error }, refetch] = useAxios(
    process.env.REACT_APP_BACKEND + "/blogs"
  );
  if (loading)
    return (
      <Flex justifyContent="center">
        <Spinner size="xl" />
      </Flex>
    );
  if (error) return <p>Error!</p>;

  return (
    <div>
      <SEO title="Trending Blogs." />
      <Grid
        margin="0 auto"
        maxW={["99%", "90%", "95%", "99%"]}
        padding={["1rem", "0.4rem", "0.3rem", "0.7rem"]}
        // templateColumns="1fr 70ch 1fr"
        templateColumns={["1fr", "1fr", "1fr", "1fr 60ch 1fr", "1fr 70ch 1fr"]}
        gap={2}
      >
        <Box
          w="100%"
          display={["none", "none", "none", "block"]}
          // border="1px solid #000"
          className="sidebar"
        />
        <Box>
          <Heading
            fontFamily={theme.fonts.body}
            marginTop="1rem"
            textAlign={["center", "left"]}
            letterSpacing="-.05em"
          >
            Trending Blogs
          </Heading>
          <Flex direction="column">
            <Box w="100%" margin="1rem 0">
              {data.blogs ? (
                <Box>
                  {data.blogs &&
                    data.blogs
                      .map((b) => <BlogCard key={b.date} data={b} />)
                      .reverse()}
                </Box>
              ) : (
                <Heading>No Blogs found.</Heading>
              )}
            </Box>
          </Flex>
        </Box>
        <Box
          w="100%"
          display={["none", "none", "none", "block"]}
          // border="1px solid #000"
          className="tag-list"
        />
      </Grid>
    </div>
  );
};

export default Blogs;
