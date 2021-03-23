import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ITreeHeading } from "../headings";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";

const StyledTreeView = styled(TreeView)`
  height: 100%;
  flex-grow: 1;
  color: white;
`;

const StyledTreeItem = styled(({ fontSize: string, ...other }) => (
  <TreeItem {...other} />
))`
  .MuiTypography-root {
    font-size: ${(props) => props.fontSize};
    color: #818181;

    &:hover {
      color: #f1f1f1;
    }
  }
`;

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

const calcFontSize = (heading: string) => {
  switch (heading) {
    case "H1":
      return "16px;";
    case "H2":
      return "14px";
    case "H3":
      return "13px";
    case "H4":
      return "12px";
    default:
      return "12px";
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
  return (
    <StyledSidebar>
      <StyledTreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {headings.map((heading, i) => {
          return (
            <StyledTreeItem
              key={i}
              nodeId={`${i}`}
              label={heading.node.text}
              onLabelClick={() => {
                scrollTo(heading.node.element);
              }}
              fontSize={calcFontSize(heading.node.tag)}
            >
              {heading.children.map((child, j) => {
                const id = (i + 1) * 1000 + j;
                return (
                  <StyledTreeItem
                    key={id}
                    nodeId={`${id}`}
                    label={child.text}
                    onLabelClick={() => {
                      scrollTo(child.element);
                    }}
                    fontSize={calcFontSize(child.tag)}
                  />
                );
              })}
            </StyledTreeItem>
          );
        })}
      </StyledTreeView>
    </StyledSidebar>
  );
};
