import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ITreeHeading } from "../headings";
import { makeStyles } from "@material-ui/core/styles";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const useStyles = makeStyles({
  root: {
    height: 240,
    flexGrow: 1,
    maxWidth: 350,
    color: "white",
  },
});

const StyledSidebar = styled.div`
  height: 100%;
  width: 360px;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
`;

const StyledItem = styled.span<{ fontSize?: string }>`
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: ${(props) => props.fontSize || "12px"};
  color: #818181;
  display: inline;

  &:hover {
    color: #f1f1f1;
  }
`;

const calcFontSize = (heading: string) => {
  switch (heading) {
    case "H1":
      return "16px;";
    case "H2":
      return "14px";
    case "H3":
      return "12px";
    case "H4":
      return "10px";
    default:
      return "10px";
  }
};

const scrollTo = (element: HTMLElement) => {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

export const Sidebar = (props: { headings: ITreeHeading[] }) => {
  const { headings } = props;
  const classes = useStyles();
  return (
    <StyledSidebar>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {headings.map((heading, i) => {
          return (
            <TreeItem
              nodeId={`${i}`}
              label={heading.node.text}
              onLabelClick={() => {
                scrollTo(heading.node.element);
              }}
            >
              {heading.children.map((child, j) => {
                return (
                  <a onClick={() => {}}>
                    <TreeItem
                      nodeId={`${(i + 1) * 1000 + j}`}
                      label={child.text}
                      onLabelClick={() => {
                        scrollTo(child.element);
                      }}
                    />
                  </a>
                );
              })}
            </TreeItem>
          );
        })}
      </TreeView>
    </StyledSidebar>
  );
};
