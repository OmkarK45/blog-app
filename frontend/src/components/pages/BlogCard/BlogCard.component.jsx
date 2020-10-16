import React, { useEffect, useState, useContext } from "react";
import { Heading, Box, Text, Flex, Grid, Image } from "@chakra-ui/core";
import theme from "../../../themes/theme";
import { Link, Redirect } from "react-router-dom";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./BlogCard.styles.scss";
import Skeleton from "react-loading-skeleton";
import { parseISO } from "date-fns";
import format from "date-fns/format";
import userContext from "../../../context/userContext";

const BlogCard = (props) => {
  const { userData } = useContext(userContext);
  const [image, setImageURL] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const fallbackImageURL = "http://unsplash.it/600/600";
  let imageExist = true;

  const handleImageLoad = () => {
    setImageURL("loaded");
  };

  const [dateVar, setDateVar] = useState("");

  useEffect(() => {
    var parsedDate = parseISO(props.data.date);
    var result = format(parsedDate, "MMM d");
    setDateVar(result);
  }, []);

  return (
    <Link to={`/blogs/${props.data.author}/${props.data._id}`}>
      <Box
        maxH="400px"
        margin="1rem 0"
        border="1px solid #eee"
        overflow="hidden"
        borderRadius="10px"
        backgroundColor="white"
        boxShadow="0 0 0 1px rgba(8,9,10,0.1)"
        cursor="pointer"
      >
        <Box>
          <Flex direction="column">
            <Box overflow="hidden">
              {!image && props.data.bannerURL && (
                <Skeleton height="200px" width="100%" />
              )}
              <Image
                src={props.data.bannerURL ? props.data.bannerURL : ""}
                height={!image ? "" : "200px"}
                width="100%"
                objectFit="cover"
                className="blog-banner"
                onLoad={handleImageLoad}
              />
            </Box>

            <Flex direction="column" padding="1rem 1.5rem">
              <Heading
                fontSize={["1.5rem", "1.8rem"]}
                fontFamily={theme.fonts.heading}
                fontWeight={theme.fontWeights.bold}
              >
                {/* Add Link tag surrounding this. */}
                {props.data.title}
              </Heading>
              <Box marginTop="0.7rem">
                <Flex alignItems="center">
                  <Box borderRadius="50%">
                    {props.data.avatar ? (
                      <Box
                        width="32px"
                        height="32px"
                        borderRadius="50%"
                        overflow="hidden"
                      >
                        <Image src={props.data.avatar} />
                      </Box>
                    ) : (
                      <HiOutlineUserCircle size="32px" />
                    )}
                  </Box>
                  <Flex>
                    <Text
                      color="#4d5760"
                      fontFamily={theme.fonts.heading}
                      marginLeft="0.7rem"
                    >
                      {props.data.author} &nbsp; • {dateVar}
                    </Text>
                    {/* Future Update : Date in MM/DD */}
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Link>
  );
};

export default BlogCard;
