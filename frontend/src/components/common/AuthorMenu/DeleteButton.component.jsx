import React, { useContext } from "react";
import { Text, Button, useToast, Box } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../../../context/userContext";
import theme from "../../../themes/theme";
import { HiOutlineTrash } from "react-icons/hi";

const Delete = (props) => {
  const toast = useToast();
  const history = useHistory();
  const { userData } = useContext(userContext);
  const handleClick = () => {
    const { author, _id } = props.data.blogInfo;
    const reqURL = `/blogs/${author}/${_id}`;
    const options = {
      headers: {
        "x-auth-token": userData.token,
      },
    };
    axios
      .delete(process.env.REACT_APP_BACKEND + reqURL, options)
      .then((res) => {
        toast({
          title: "Blog deleted!",
          status: "success",
          isClosable: true,
        });
        history.goBack();
      })
      .catch((err) => {
        toast({
          title: "Success!",
          description: "Blog deleted. Refresh to see changes.",
          status: "success",
          isClosable: true,
        });
        history.goBack();
      });
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      onClick={handleClick}
    >
      <Text>
        <HiOutlineTrash style={{ margin: "0 0.3rem" }} fontSize="1.2rem" />
      </Text>
      <Text fontSize="1.2rem">Unpublish</Text>
    </Box>
  );
};

export default Delete;
