import React from "react";
import ReactDOM from "react-dom";
import { getHeadings } from "./headings";
import { Sidebar } from "./components/sidebar";

const body = document.querySelector<HTMLBodyElement>("body");
const root = document.createElement("div");
root.id = "headingsRoot";
body?.insertAdjacentElement("beforebegin", root);

const headings = getHeadings(body);
ReactDOM.render(<Sidebar nodes={headings} />, root);
