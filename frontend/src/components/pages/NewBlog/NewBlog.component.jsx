import React, { useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Box, Flex, Text, Heading, Button, Input } from "@chakra-ui/core";
import theme from "../../../themes/theme";
import userContext from "../../../context/userContext";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";

const NewBlog = () => {
  const [value, setValue] = useState();
  const [bannerURL, setBannerURL] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const { userData } = useContext(userContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    console.log("Current userdata is ", userData);
    e.preventDefault();
    const { user, token } = userData;
    if (!user.username || !user.id || !user.email || !token) {
      console.log("NO ACCESS");
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
            // toast here
            history.push("/blogs");
          });
      } else {
        // toast here
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
