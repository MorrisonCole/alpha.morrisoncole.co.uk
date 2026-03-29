import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdx-components";
import { App } from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <MDXProvider components={mdxComponents}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MDXProvider>
    </HelmetProvider>
  </React.StrictMode>,
);
