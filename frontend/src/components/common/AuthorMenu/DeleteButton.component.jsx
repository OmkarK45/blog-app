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
    console.log(props.data, _id);
    const reqURL = `/blogs/${author}/${_id}`;
    const options = {
      headers: {
        "x-auth-token": userData.token,
      },
    };
    axios
      .delete(reqURL, options)
      .then((res) => {
        toast({
          title: "Blog deleted!",
          status: "success",
          isClosable: true,
        });
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
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
    <Box onClick={handleClick}>
        <HiOutlineTrash style={{ fontSize: "1.3rem", margin: "0 1rem" }} />
        Delete
    </Box>
  );
};

export default Delete;
