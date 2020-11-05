import React, { useState, useContext, useEffect } from "react";
import {
  Heading,
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Button,
  Spinner,
  useToast,
} from "@chakra-ui/core";
import ReactMarkdown from "react-markdown";
import theme from "../../../themes/theme";
import Skeleton from "react-loading-skeleton";
import ChakraUIRenderer, { defaults } from "./BlogRender";
import userContext from "../../../context/userContext";
import "./Blog.styles.scss";
import axios from "axios";
import { useHistory } from "react-router-dom";
import AuthorMenu from "./../../common/AuthorMenu/AuthorMenu.component";
import { HiOutlineUserCircle } from "react-icons/hi";
import SEO from "./../../common/SEO/SEO.component";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
} from "react-share";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaReddit, FaWhatsapp } from "react-icons/fa";
import SocialMedia from "../../common/SocialMedia/SocialMedia.component";

const Blog = (props) => {
  const [blog, setBlog] = useState("");
  const [image, setImageURL] = useState("");
  const { userData } = useContext(userContext);
  const toast = useToast();
  const history = useHistory();
  const reqURL = `/blogs/${props.match.params.username}/${props.match.params.blogID}`;

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + reqURL)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        toast({
          title: "Some error occured.",
          description: err.response.data.msg,
          isClosable: true,
        });
        history.push("/blogs");
      });
  }, []);

  const handleImageLoad = () => {
    setImageURL("loaded");
  };

  return (
    <React.Fragment>
      <SEO title={blog.title} />

      <Box maxW={["98%", "100%", "99%"]} margin={["0 auto"]}>
        <Grid templateColumns={["1fr", "1fr", "1fr", "1fr 75ch 1fr"]} gap={2}>
          <Box w="100%" h="2rem">
            <SocialMedia link={window.location.href} />
          </Box>
          <Box
            w="100%"
            margin={["1.4rem 0"]}
            id="container"
            backgroundColor={theme.colors.white}
            boxShadow="0 0 0 1px rgba(8,9,10,0.1)"
            borderRadius="10px"
          >
            <Box
              overflow="hidden"
              boxShadow=" 0px 18px 39px 10px rgba(153,153,153,0.61)"
            >
              {blog.bannerURL !== "" ? (
                <Image
                  src={blog.bannerURL}
                  onLoad={handleImageLoad}
                  w="100%"
                  height="280px"
                  maxH="280px"
                  objectFit="cover"
                  borderRadius="5px"
                ></Image>
              ) : (
                ""
              )}
            </Box>

            <Box
              padding={["0 0.5rem", "0 .7rem", "0 3rem"]}
              className="md-content"
            >
              <Heading
                fontSize={["2.35rem", "3rem"]}
                lineHeight={["1.25"]}
                marginTop={["2rem", "1.7rem", "1.4rem", "1.6rem"]}
                padding={[""]}
                fontFamily={theme.fonts.body}
                fontWeight="700"
                letterSpacing="-.05em"
              >
                {blog.title || <Skeleton />}
              </Heading>
              <Box
                margin="1.9rem 0"
                display="flex"
                justifyContent={["space-between"]}
              >
                <Box display="flex" alignItems="center">
                  <Box height="45px" width="45px" marginRight="1rem">
                    {blog.avatar ? (
                      <Image
                        display="block"
                        borderRadius="50%"
                        height="45px"
                        width="45px"
                        src={blog.avatar}
                        objectFit="cover"
                      />
                    ) : (
                      <HiOutlineUserCircle className="user-icon" />
                    )}
                  </Box>
                  <Box>
                    <Text
                      fontSize={theme.fontSizes["lg"]}
                      fontWeight="bold"
                      fontFamily={theme.fonts.body}
                    >
                      {blog.author}
                    </Text>
                    <Text color="#808080" fontSize={theme.fontSizes["sm"]}>
                      {blog.date}
                    </Text>
                  </Box>
                </Box>

                <Box>
                  <userContext.Consumer>
                    {(value) => {
                      if (value.userData.user) {
                        return (
                          <AuthorMenu
                            data={value.userData.user}
                            blogInfo={blog}
                          />
                        );
                      } else {
                        return "";
                      }
                    }}
                  </userContext.Consumer>
                </Box>
              </Box>

              <Box padding={[""]}>
                <ReactMarkdown
                  renderers={ChakraUIRenderer()}
                  source={blog.content}
                  escapeHtml={false}
                />
              </Box>
            </Box>
          </Box>
          <Box
            w="100%"
            h="10"
            display={["none", "none", "none", "block"]}
          ></Box>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Blog;
