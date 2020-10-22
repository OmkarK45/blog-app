import React, { useContext } from "react";
import { Box, Text } from "@chakra-ui/core";
import { HiOutlinePencilAlt } from "react-icons/hi";
import userContext from "../../../context/userContext";
import { Link } from "react-router-dom";

const Edit = (props) => {
  return (
    <Link
      to={{
        pathname: "/blogs/edit",
        state: props,
      }}
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <HiOutlinePencilAlt style={{margin:'0 0.3rem'}} fontSize="1.2rem"/>
        <Text fontSize="1.2rem">Edit</Text>
      </Box>
    </Link>
  );
};

export default Edit;
