import React from "react";
import { Heading, Text, Button, Flex } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <React.Fragment>
      <Flex
        height="50vh"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
      >
        <Heading>404!</Heading>
        <Heading>
          Oops ! Requested resource was not found on this website.
        </Heading>
        <Link to="/blogs" style={{ marginTop: "5rem" }}>
          <Button>Go Back</Button>
        </Link>
      </Flex>
    </React.Fragment>
  );
};

export default NotFound;
