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

interface ITemp {
  text: string;
  layer: number;
  element: HTMLElement;
}

export const getHeadings = (root: HTMLElement | null): INode[] => {
  if (!root) return [];
  const headings: ITemp[] = [];
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

  const _partitionByLayer = (headings: ITemp[]): INode[] => {
    const partitioned = new Map<number, ITemp[]>();
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
      const root: INode = {
        element: {
          value: document.createElement("h1"),
          text: "aaaaaaa",
        },
        children: [],
      };
      const heads = next.value;
      let last = root;
      for (const current of heads) {
        // current: H2, last: H1
        if (current.text > last.element.text) {
          last.children.push({
            element: {
              value: current.element,
              text: current.text,
            },
            children: [],
          });
        } else {
          root.children.push({
            element: {
              value: current.element,
              text: current.text,
            },
            children: [],
          });
        }
        last = {
          element: {
            value: current.element,
            text: current.text,
          },
          children: [],
        };
      }
      headingsByLayer.push(root);
    }
    return headingsByLayer;
  };

  return _partitionByLayer(headings);
};
