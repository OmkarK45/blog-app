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
      <Flex flexDirection="column" maxW={['90%', '1200px']} padding='0.5rem 1rem' border='1px solid #eee' borderRadius='10px' margin="1rem auto">
        <form onSubmit={handleSubmit}>
          <Heading margin='1rem 0'>New Blog</Heading>
          <Input margin='1rem 0' placeholder='New blog title here...'/>
          <Box></Box>
          <MDEditor height={400} value={value} onChange={setValue} />
          <Flex  margin='1rem 0'>
            <Button
              backgroundColor={theme.colors.accent}
              color="white"
             
              _hover={{ color: "white", backgroundColor: "#323EBE" }}
              type='submit'
            >
              Publish
            </Button>
            {/* Future update : Save draft feature */}
            <Button marginLeft='2rem' isDisabled={true}>  
              Save as a draft
            </Button>
          </Flex>
        </form>
      </Flex>
    </React.Fragment>
  );
};

export default NewBlog;
