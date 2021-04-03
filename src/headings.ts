const isHeading = (e: HTMLElement): boolean => {
  return !!e.tagName.match("^H[1-3]$");
};

interface IElement {
  value: HTMLElement;
  text: string;
}

export interface INode {
  element: IElement;
  children: INode[];
}

interface IHeading {
  text: string;
  layer: number;
  tagName: string;
  element: HTMLElement;
}

export const getHeadings = (root: HTMLElement | null): INode[] => {
  if (!root) return [];
  const headings: IHeading[] = [];
  let currentHeading = "";
  let layer = 0;
  const _walk = (el: HTMLElement) => {
    if (!el) return;

    if (isHeading(el)) {
      if (currentHeading === "" || currentHeading >= el.tagName) {
        currentHeading = el.tagName;
        layer++;
      }
      if (currentHeading === "H1") {
        currentHeading = el.tagName;
      }
      headings.push({
        text: el.innerText,
        tagName: el.tagName,
        layer: layer,
        element: el,
      });
    }
    for (const c of Array.from(el.children)) {
      if (c instanceof HTMLElement) {
        _walk(c);
      }
    }
  };

  _walk(root);

  const _partitionByLayer = (headings: IHeading[]): INode[] => {
    const partitioned = new Map<number, IHeading[]>();
    for (const h of headings) {
      const v = partitioned.get(h.layer) ?? [];
      v.push(h);
      partitioned.set(h.layer, v);
    }
    const headingsByLayer: INode[] = [];

    const it = partitioned.values();
    while (1) {
      const next = it.next();
      if (next.done) {
        break;
      }
      const heads = next.value;
      if (!heads.length) {
        break;
      }

      const root: INode = {
        element: {
          value: heads[0].element,
          text: heads[0].text,
        },
        children: [],
      };
      let lastTagName = heads[0].tagName;
      let ch = root.children;
      for (const current of heads.slice(1)) {
        // current: H2, last: H1
        if (current.tagName > lastTagName) {
          const newch: INode[] = [];
          ch.push({
            element: {
              value: current.element,
              text: current.text,
            },
            children: newch,
          });
          ch = newch;
        } else {
          ch.push({
            element: {
              value: current.element,
              text: current.text,
            },
            children: [],
          });
        }
        lastTagName = current.tagName;
      }
      console.log(root);
      headingsByLayer.push(root);
    }
    return headingsByLayer;
  };

  return _partitionByLayer(headings);
};
