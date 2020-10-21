import React, { useContext } from "react";
import { Box } from "@chakra-ui/core";
import { HiOutlinePencilAlt } from "react-icons/hi";
import userContext from "../../../context/userContext";
import { Link } from "react-router-dom";

const Edit = (props) => {
  return (
    <Box>
      <Link to={{
        pathname:"/blogs/edit",
        state:props
      }}>
        <HiOutlinePencilAlt style={{ fontSize: "1.3rem", margin: "0 1rem" }} />
        Edit
      </Link>
    </Box>
  );
};

export default Edit;
