import React from "react";
import { AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import { FaReddit } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { Flex, Box } from "@chakra-ui/core";

const SocialMedia = (props) => {
  return (
    <Flex
      direction={["row", "row", "row", "column"]}
      margin="0 auto"
      width="80%"
      alignItems={["center", "flex-end"]}
      justifyContent="space-between"
      marginTop={["0", "0", "0", "2rem"]}
    >
      <Box margin="0.5rem 0">
        <a
          href={
            `https://twitter.com/intent/tweet?url=` +
            encodeURIComponent(props.link) +
            "&text=Checkout my blog published on semicolon! Do read and share!"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillTwitterCircle style={{ color: "#1da1f2" }} size="45px" />
        </a>
      </Box>
      {/* <Box margin="0.5rem 0">
        <a href={props.link}>
          <FaReddit style={{ color: "#ff4500" }} size="45px" />
        </a>
      </Box> */}
      <Box margin="0.5rem 0">
        <a
          href={
            "whatsapp://send?text=Checkout my blog on semicolon! " +
            encodeURIComponent(props.link)
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <IoLogoWhatsapp style={{ color: "#25d366" }} size="45px" />
        </a>
      </Box>
      <Box margin="0.5rem 0">
        <a
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
            props.link
          )}&title=Checkout%20my%20blog!&summary=&source=`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AiFillLinkedin style={{ color: "#0077b5" }} size="45px" />
        </a>
      </Box>
    </Flex>
  );
};

export default SocialMedia;
