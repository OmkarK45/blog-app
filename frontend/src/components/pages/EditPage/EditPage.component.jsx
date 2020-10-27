import React, { useState, useEffect, useContext } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Flex, Box, Input, Button, Heading, useToast } from "@chakra-ui/core";
import theme from "../../../themes/theme";
import userContext from "../../../context/userContext";
import { useHistory } from "react-router-dom";
import axios from "axios";

const EditPage = (props) => {
  const { blogInfo } = props.location.state.data;
  const { userData } = useContext(userContext);
  const [value, setValue] = useState();
  const [bannerURL, setBannerURL] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    setBannerURL(blogInfo.bannerURL);
    setBlogTitle(blogInfo.title);
    setValue(blogInfo.content);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user, token } = userData;
    if (!user) {
      toast({
        title: "Error!",
        status: "error",
        description: "You need to be logged in to Edit that blog.",
        isClosable: true,
      });
      history.push("/user/login");
    } else {
      const editedBlogData = {
        title: blogTitle,
        bannerURL: bannerURL,
        content: value,
      };
      const reqURL = `/blogs/${blogInfo.author}/${blogInfo._id}`;
      if (userData.user.id) {
        axios.interceptors.request.use((req) => {
          req.headers["x-auth-token"] = token;
          return req;
        });
        axios
          .patch(process.env.REACT_APP_BACKEND + reqURL, editedBlogData)
          .then((res) => {
            toast({
              title: "Successfully Edited!",
              description: "Your blog was updated.",
              status: "success",
              isClosable: true,
            });
            console.log(res);
            history.push("/blogs");
          })
          .catch((err) => {
            toast({
              title: "Error!",
              description: "Blog edit failed.",
              status: "error",
              isClosable: true,
            });
            history.push("/blogs");
          });
      } else {
        toast({
          title: "Some error occured.",
          description: "Please log in and try again.",
          status: "error",
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
            <Heading marginRight="2rem">Edit Blog</Heading>
          </Flex>
          <Input
            width="50%"
            value={bannerURL}
            type="url"
            onChange={handleBannerURL}
            name="bannerURL"
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
          <MDEditor height={400} value={blogInfo.content} onChange={setValue} />
          <Flex margin="1rem 0">
            <Button
              backgroundColor={theme.colors.accent}
              color="white"
              _hover={{ color: "white", backgroundColor: "#323EBE" }}
              type="submit"
            >
              Publish
            </Button>
          </Flex>
        </form>
      </Flex>
    </React.Fragment>
  );
};

export default EditPage;
