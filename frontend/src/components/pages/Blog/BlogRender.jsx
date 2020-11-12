import React from "react";
import {
  Text,
  Code,
  Divider,
  Link,
  List,
  Checkbox,
  ListItem,
  Heading,
  Image,
} from "@chakra-ui/core";

function getCoreProps(props) {
  return props["data-sourcepos"]
    ? { "data-sourcepos": props["data-sourcepos"] }
    : {};
}

export const defaults = {
  paragraph: (props) => {
    const { children } = props;
    return (
      <Text mb={2} fontSize="1.25rem">
        {children}
      </Text>
    );
  },
  emphasis: (props) => {
    const { children } = props;
    return (
      <Text as="em" fontSize="1.25rem">
        {children}
      </Text>
    );
  },
  blockquote: (props) => {
    const { children } = props;
    return (
      <Code p={2} fontSize="1.25rem">
        {children}
      </Code>
    );
  },
  code: (props) => {
    const { language, value } = props;
    const className = language && `language-${language}`;
    return (
      <pre {...getCoreProps(props)}>
        <Code p={2} className={className || null}>
          {value}
        </Code>
      </pre>
    );
  },
  delete: (props) => {
    const { children } = props;
    return <Text as="del">{children}</Text>;
  },
  thematicBreak: Divider,
  link: (props) => {
    const { children } = props;
    return (
      <Link
        href={props.href}
        isExternal
        style={{
          textDecoration: "none",
          color: "inherit",
          outline: "none",
          transition: "background-color .25s ease-out",
          display: "inline-block",
          padding: "0 1px",
          borderBottom: "0.2em solid #ccc",
        }}
        _hover={{
          backgroundColor: "#ccc",
        }}
      >
        {children}
      </Link>
    );
  },
  img: Image,
  linkReference: Link,
  imageReference: Image,
  text: (props) => {
    const { children } = props;
    return <Text as="span">{children}</Text>;
  },
  list: (props) => {
    const { start, ordered, children, depth } = props;
    const attrs = getCoreProps(props);
    if (start !== null && start !== 1 && start !== undefined) {
      attrs.start = start.toString();
    }
    let styleType = "disc";
    if (ordered) styleType = "decimal";
    if (depth === 1) styleType = "circle";
    return (
      <List
        spacing={24}
        as={ordered ? "ol" : "ul"}
        styleType={styleType}
        pl={4}
        {...attrs}
      >
        {children}
      </List>
    );
  },
  listItem: (props) => {
    const { children, checked } = props;
    let checkbox = null;
    if (checked !== null && checked !== undefined) {
      checkbox = (
        <Checkbox isChecked={checked} isReadOnly>
          {children}
        </Checkbox>
      );
    }
    return (
      <ListItem
        {...getCoreProps(props)}
        listStyleType={checked !== null ? "none" : "inherit"}
      >
        {checkbox || children}
      </ListItem>
    );
  },
  definition: () => null,
  heading: (props) => {
    const { level, children } = props;
    const sizes = ["xl", "lg", "md", "sm", "xs"];

    return (
      <Heading
        my={4}
        fontWeight="700"
        as={`h${level}`}
        size={sizes[`${level - 1}`]}
        // fontSize={["1.9rem"]}
        {...getCoreProps(props)}
      >
        {children}
      </Heading>
    );
  },
  inlineCode: (props) => {
    const { children } = props;
    return <Code {...getCoreProps(props)}>{children}</Code>;
  },
};

function ChakraUIRenderer(theme = defaults) {
  return {
    paragraph: theme.paragraph,
    emphasis: theme.emphasis,
    blockquote: theme.blockquote,
    code: theme.code,
    delete: theme.delete,
    thematicBreak: theme.thematicBreak,
    link: theme.link,
    img: theme.img,
    linkReference: theme.linkReference,
    imageReference: theme.imageReference,
    text: theme.text,
    list: theme.list,
    listItem: theme.listItem,
    definition: theme.definition,
    heading: theme.heading,
    inlineCode: theme.inlineCode,
  };
}

export default ChakraUIRenderer;
