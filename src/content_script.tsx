import React from "react";
import ReactDOM from "react-dom";
import { getHeadingsRoot } from "./headings";
import { Sidebar } from "./components/sidebar";

const body = document.querySelector<HTMLBodyElement>("body");
const root = document.createElement("div");
root.id = "headingsRoot";
body?.insertAdjacentElement("beforebegin", root);

const headingsRoot = getHeadingsRoot(body);
ReactDOM.render(<Sidebar nodes={[headingsRoot]} />, root);
