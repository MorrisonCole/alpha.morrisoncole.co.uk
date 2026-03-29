import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdx-components";
import { App } from "./App";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

ReactDOM.createRoot(rootElement).render(
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
