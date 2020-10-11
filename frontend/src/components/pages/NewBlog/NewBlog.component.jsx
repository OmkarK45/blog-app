import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import { Box, Flex, Text, Heading, Button, Input } from "@chakra-ui/core";
import theme from "../../../themes/theme";

const NewBlog = () => {
  const [value, setValue] = useState();
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(value);
  };
  return (
    <React.Fragment>
      <Flex flexDirection="column" maxW="1200px" margin="0 auto">
        <form onSubmit={handleSubmit}>
          <Input />
          <Box></Box>
          <MDEditor height={400} value={value} onChange={setValue} />
          <Flex>
            <Button
              backgroundColor={theme.colors.accent}
              color="white"
              _hover={{ color: "white", backgroundColor: "#323EBE" }}
              type='submit'
            >
              Publish
            </Button>
            {/* Future update : Save draft feature */}
          </Flex>
        </form>
      </Flex>
    </React.Fragment>
  );
};

export default NewBlog;
