import React, { useContext } from "react";
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

const NewBlog = () => {
  const [value, setValue] = useState();
  const [bannerURL, setBannerURL] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const { userData } = useContext(userContext);
  const toast = useToast();
  const history = useHistory();

  const handleSubmit = (e) => {
    console.log("Current userdata is ", userData);
    e.preventDefault();
    const { username, email, user, token } = userData;
    if (!username || !email || !user || !token) {
      toast({
        title: "Error!",
        description: "You need to be logged in to do that.",
        isClosable: true,
        status: "error",
      });
    } else {
      const blogData = {
        title: blogTitle,
        content: value,
        authorID: userData.user.username,
        date: Date.now(),
        bannerURL: bannerURL,
      };

      console.log("Complete Blog is ", blogData);
      // make a post request to /blogs/new
      const options = {
        headers: {
          "x-auth-token": userData.token,
        },
      };
      if (userData.user.id) {
        axios
          .post("/blogs/new", blogData, options)
          .then(() => history.push("/blogs"))
          .catch((err) => {
            toast({
              title: "Error!",
              description:
                "Error occured while publishing your blog. Please try later.",
              isClosable: true,
              status: "error",
            });
            history.push("/blogs");
          });
      } else {
        toast({
          title: "Error !",
          status: "error",
          description: "You need to be logged in to do that.",
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
      <Flex
        flexDirection="column"
        maxW={["90%", "1200px"]}
        padding="0.5rem 1rem"
        border="1px solid #eee"
        borderRadius="10px"
        margin="1rem auto"
      >
        <form onSubmit={handleSubmit}>
          <Flex margin="1rem 0" alignItems="center">
            <Heading marginRight="2rem">New Blog</Heading>
            <Input
              width="50%"
              value={bannerURL}
              onChange={handleBannerURL}
              name="bannerURL"
              placeholder="Add Banner Image..."
            />
          </Flex>
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
          <MDEditor height={400} value={value} onChange={setValue} />
          <Flex margin="1rem 0">
            <Button
              backgroundColor={theme.colors.accent}
              color="white"
              _hover={{ color: "white", backgroundColor: "#323EBE" }}
              type="submit"
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
