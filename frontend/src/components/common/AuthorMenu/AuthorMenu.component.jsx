import React, { useContext } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Text,
} from "@chakra-ui/core";
import Delete from "./DeleteButton.component";
import userContext from "../../../context/userContext";
import { useEffect } from "react";

const AuthorMenu = (props) => {
  const { userData } = useContext(userContext);

  console.log("Current user", props.data._id);
  console.log("Blogs author", props.blogInfo.authorID);

  return (
    <React.Fragment>
      {props.blogInfo ? (
        props.blogInfo.authorID === props.data._id ? (
          <Delete data={props} />
        ) : (
          "Not Author no delete button for you."
        )
      ) : (
        "no blog is there"
      )}
    </React.Fragment>
  );
};

export default AuthorMenu;
