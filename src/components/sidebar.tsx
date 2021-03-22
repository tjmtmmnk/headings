import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IHeading } from "../headings";

const StyledSidebar = styled.div`
  height: 100%;
  width: 360px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
`;

const StyledItem = styled.a<{ fontSize?: string }>`
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: ${(props) => props.fontSize || "12px"};
  color: #818181;
  display: block;

  &:hover {
    color: #f1f1f1;
  }
`;

const partitionByLayer = (headings: IHeading[]) => {
  const partitioned = new Map<number, IHeading[]>();
  for (const h of headings) {
    const v = partitioned.get(h.layer) ?? [];
    v.push(h);
    partitioned.set(h.layer, v);
  }
  const headingsByLayer: IHeading[][] = [];
  const it = partitioned.entries();
  while (1) {
    const next = it.next();
    if (next.done) break;
    headingsByLayer.push(next.value[1]);
  }
  return headingsByLayer;
};

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

export const Sidebar = (props: { headings: IHeading[] }) => {
  const { headings } = props;
  const headingsByLayer = partitionByLayer(headings);
  return (
    <StyledSidebar>
      {headingsByLayer.map((headings) => (
        <>
          -----
          {headings.map((h) => (
            <Item
              text={h.text}
              fontSize={calcFontSize(h.tag)}
              onClick={() => {
                h.element.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
            />
          ))}
          -----
        </>
      ))}
    </StyledSidebar>
  );
};

const Item = (props: {
  text: string;
  fontSize?: string;
  onClick: () => void;
}) => {
  const { text, fontSize, onClick } = props;
  return (
    <StyledItem fontSize={fontSize} onClick={onClick}>
      {text}
    </StyledItem>
  );
};
