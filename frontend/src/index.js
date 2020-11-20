import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

import ReactGA from "react-ga";
ReactGA.initialize("G-G00JK71HTT");
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <ThemeProvider>
    <CSSReset />
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
