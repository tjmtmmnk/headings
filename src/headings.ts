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
  const rootNode: INode = {
    element: {
      value: document.createElement("div"),
      text: document.title,
    },
    children: [],
  };
  if (!root) return [rootNode];

  const headings: IHeading[] = [];
  let layer = 0;
  let parentElement: HTMLElement | null;
  const _walk = (el: HTMLElement) => {
    if (!el) return;

    if (isHeading(el)) {
      if (parentElement !== el.parentElement) {
        layer++;
      }
      headings.push({
        text: el.innerText,
        tagName: el.tagName,
        layer: layer,
        element: el,
      });
    }
    parentElement = el.parentElement;
    for (const c of Array.from(el.children)) {
      if (c instanceof HTMLElement) {
        _walk(c);
      }
    }
  };

  _walk(root);

  const _partitionByLayer = (root: INode, headings: IHeading[]) => {
    const partitioned = new Map<number, IHeading[]>();
    for (const h of headings) {
      const v = partitioned.get(h.layer) ?? [];
      v.push(h);
      partitioned.set(h.layer, v);
    }

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

      let ch = root.children;
      for (let i = 0; i < heads.length; i++) {
        const current = heads[i];
        const nextTagName = heads[i + 1]?.tagName ?? "";

        const newCh: INode[] = [];
        ch.push({
          element: {
            value: current.element,
            text: current.text,
          },
          children: newCh,
        });

        // e.g current: H1, next: H2
        if (current.tagName < nextTagName) {
          ch = newCh;
        } else {
          ch = root.children;
        }
      }
    }
  };

  _partitionByLayer(rootNode, headings);
  return [rootNode];
};
