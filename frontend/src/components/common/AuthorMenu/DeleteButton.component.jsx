import React, { useContext } from "react";
import { Text, Button, useToast } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userContext from "../../../context/userContext";

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
        history.push("/blogs");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Delete failed.",
          description: "Unknown error occured.",
          status: "error",
          isClosable: true,
        });
      });
  };

  return <Button onClick={handleClick}>Delete</Button>;
};

export default Delete;
