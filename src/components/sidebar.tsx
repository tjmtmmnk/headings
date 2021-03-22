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

const partitionByLayer = (headings: IHeading[]) => {
  const partitioned = new Map<number, IHeading[]>();
  for (const h of headings) {
    const v = partitioned.get(h.layer) ?? [];
    v.push(h);
    partitioned.set(h.layer, v);
  }
  const arrays: IHeading[][] = [];
  const it = partitioned.entries();
  while (1) {
    const next = it.next();
    if (next.done) break;
    arrays.push(next.value[1]);
  }
  return arrays;
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
            <Item text={h.text} />
          ))}
          -----
        </>
      ))}
    </StyledSidebar>
  );
};

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

const Item = (props: { text: string; fontSize?: string }) => {
  const { text, fontSize } = props;
  return <StyledItem fontSize={fontSize}>{text}</StyledItem>;
};
