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
import { HiMenu, HiOutlineTrash } from "react-icons/hi";
import EditPage from "./../../pages/EditPage/EditPage.component";

const AuthorMenu = (props) => {
  const { userData } = useContext(userContext);

  return (
    <React.Fragment>
      {props.blogInfo ? (
        props.blogInfo.authorID === (userData.user.id || props.data._id) ? (
          <div>
            <Menu>
              <MenuButton as={Button}>
                <HiMenu />
              </MenuButton>
              <MenuList minWidth="35px" display="block">
                <MenuItem>
                  <Delete data={props} />
                </MenuItem>
                <MenuItem>
                  <Edit data={props} />
                </MenuItem>
              </MenuList>
            </Menu>
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
