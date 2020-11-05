import React, { useContext, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Heading,
  Button,
  Input,
  useToast,
} from "@chakra-ui/core";
import theme from "../../../themes/theme";
import userContext from "../../../context/userContext";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import SEO from "./../../common/SEO/SEO.component";

const NewBlog = () => {
  const [value, setValue] = useState();
  const [bannerURL, setBannerURL] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const { userData } = useContext(userContext);
  const history = useHistory();
  const toast = useToast();
  let isSubmitting = false;
  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, token } = userData;
    if (!user) {
      toast({
        title: "Error!",
        status: "error",
        description: "You need to be logged in to publish a blog.",
        isClosable: true,
      });
      history.push("/user/login");
    } else {
      const blogData = {
        title: blogTitle,
        content: value,
        author: userData.user.username,
        date: new Date().toDateString(),
        bannerURL: bannerURL,
        authorID: userData.user.id,
        avatar: userData.user.avatar,
      };
      const options = {
        headers: {
          "x-auth-token": userData.token,
        },
      };
      if (userData.user.id) {
        axios
          .post(process.env.REACT_APP_BACKEND + "/blogs/new", blogData, options)
          .then(() => {
            history.push("/blogs");
            toast({
              title: "Blog Published!",
              description: "Please wait for approval :)",
              isClosable: true,
              status: "success",
            });
            isSubmitting = true;
          })
          .catch((err) => {
            toast({
              title: "Error!",
              description:
                "Some error occured while publishing your blog. Please try again.",
              isClosable: true,
              status: "error",
            });
            history.push("/blogs");
          });
      } else {
        toast({
          title: "Error!",
          status: "error",
          description: "You need to be logged in to publish a blog.",
          isClosable: true,
        });
        history.push("/user/login");
      }
    }
  };
  const handleBannerURL = (e) => {
    setBannerURL(e.target.value);
  };

  const handleBlogTitle = (e) => {
    setBlogTitle(e.target.value);
  };

  return (
    <React.Fragment>
      <SEO title="Publish your blog." />
      <Flex
        flexDirection="column"
        maxW={["90%", "1200px"]}
        padding="0.5rem 1rem"
        border="2px solid #eee"
        borderRadius="10px"
        margin="1rem auto"
        backgroundColor="white"
      >
        <form onSubmit={handleSubmit}>
          <Flex margin="1rem 0" alignItems="center">
            <Heading letterSpacing="-.05em" marginRight="2rem">
              New Blog
            </Heading>
          </Flex>
          <Input
            width="50%"
            value={bannerURL}
            type="url"
            onChange={handleBannerURL}
            name="bannerURL"
            placeholder="Add Banner Image..."
          />
          <Input
            margin="1rem 0"
            id="title"
            value={blogTitle}
            onChange={handleBlogTitle}
            type="text"
            name="title"
            placeholder="New blog title here..."
          />
          <Box></Box>
          <MDEditor
            height={400}
            value={value}
            onChange={setValue}
            previewOptions={{
              transformLinkUri: null,
              skipHtml: true,
            }}
          />
          <Flex margin="1rem 0">
            <Button
              backgroundColor={theme.colors.accent}
              color="white"
              _hover={{ color: "white", backgroundColor: "#323EBE" }}
              type="submit"
              isLoading={isSubmitting}
            >
              Publish
            </Button>
            {/* Future update : Save draft feature */}
            <Button marginLeft="2rem" isDisabled={true}>
              Save as a draft
            </Button>
          </Flex>
        </form>
      </Flex>
    </React.Fragment>
  );
};

export default NewBlog;
