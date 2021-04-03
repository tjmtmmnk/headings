import React from "react";
import styled from "styled-components";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { v4 as uuidv4 } from "uuid";
import { INode } from "../headings";

const StyledTreeView = styled(TreeView)`
  color: white;
`;

const StyledTreeItem = styled(TreeItem)`
  .MuiTypography-root {
    color: #818181;

    &:hover {
      color: #f1f1f1;
    }
    font-size: 12px;
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

const scrollTo = (element: HTMLElement) => {
  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};

const Node = (props: { node: INode }) => {
  const { node } = props;
  if (node.children.length === 0) {
    return (
      <StyledTreeItem
        key={uuidv4()}
        nodeId={uuidv4()}
        label={node.element.text}
        onLabelClick={() => {
          scrollTo(node.element.value);
        }}
      />
    );
  }
  return (
    <StyledTreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <StyledTreeItem
        key={uuidv4()}
        nodeId={uuidv4()}
        label={node.element.text}
        onLabelClick={() => {
          scrollTo(node.element.value);
        }}
      >
        {node.children.map((c) => {
          return <Node node={c} key={uuidv4()} />;
        })}
      </StyledTreeItem>
    </StyledTreeView>
  );
};

export const Sidebar = (props: { nodes: INode[] }) => {
  const { nodes } = props;
  return (
    <StyledSidebar>
      {nodes.map((n) => {
        return <Node node={n} key={uuidv4()} />;
      })}
    </StyledSidebar>
  );
};
