import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { getHeadings } from "./headings";
import { Sidebar } from "./components/sidebar";

const body = document.querySelector<HTMLBodyElement>("body");
const root = document.createElement("div");
root.id = "headingsRoot";
body?.insertAdjacentElement("beforebegin", root);

const headings = getHeadings(body);
ReactDOM.render(
  <React.StrictMode>
    <Sidebar headings={headings} />
  </React.StrictMode>,
  root
);
