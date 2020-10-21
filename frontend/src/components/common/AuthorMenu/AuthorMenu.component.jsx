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
  Button,
} from "@chakra-ui/core";
import Delete from "./DeleteButton.component";
import userContext from "../../../context/userContext";
import { useEffect } from "react";
import Edit from "./Edit.component";
import { HiMenu,HiOutlineTrash } from "react-icons/hi";

const AuthorMenu = (props) => {
  const { userData } = useContext(userContext);

  console.log("Current user", props.data._id);
  console.log("Current userData", userData.user.id);
  console.log("Blogs author", props.blogInfo.authorID);

  return (
    <React.Fragment>
      {props.blogInfo ? (
        props.blogInfo.authorID === (userData.user.id || props.data._id) ? (
          <div>
            <Menu>
              <MenuButton as={Button}>
                <HiMenu />
              </MenuButton>
              <MenuList minWidth="35px">
                <MenuItem>
                 <Delete />
                </MenuItem>
                <MenuItem>
                  <Edit />
                </MenuItem>
              </MenuList>
            </Menu>
            {/* <Delete data={props} />
            <Edit data={props} /> */}
          </div>
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
