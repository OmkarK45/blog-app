import React from "react";
import { Box } from "@chakra-ui/core";
import { HiOutlinePencilAlt } from "react-icons/hi";
const Edit = (props) => {
  const handleClick = () => {
    console.log("Edit pressed");
  };
  return (
    <Box onClick={handleClick}>
      <HiOutlinePencilAlt style={{ fontSize: "1.3rem", margin: "0 1rem" }}/> Edit
    </Box>
  );
};

export default Edit;
