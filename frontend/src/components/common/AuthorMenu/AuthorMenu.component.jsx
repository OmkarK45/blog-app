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
  console.log("Current userData", userData.user.id);
  console.log("Blogs author", props.blogInfo.authorID);

  return (
    <React.Fragment>
      {props.blogInfo ? (
        props.blogInfo.authorID === (userData.user.id || props.data._id) ? (
          <Delete data={props} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default AuthorMenu;
