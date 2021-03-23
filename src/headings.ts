export interface IHeading {
  text: string;
  tag: string;
  layer: number;
  element: HTMLElement;
}

export interface ITreeHeading {
  node: IHeading;
  children: IHeading[];
}

const isHeading = (e: HTMLElement): boolean => {
  return !!e.tagName.match("^H[1-4]$");
};

export const getHeadings = (root: HTMLElement | null): ITreeHeading[] => {
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
        tag: el.tagName,
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

  const _partitionByLayer = (headings: IHeading[]): ITreeHeading[] => {
    const partitioned = new Map<number, IHeading[]>();
    for (const h of headings) {
      const v = partitioned.get(h.layer) ?? [];
      v.push(h);
      partitioned.set(h.layer, v);
    }
    const headingsByLayer: ITreeHeading[] = [];
    const it = partitioned.entries();
    while (1) {
      const next = it.next();
      if (next.done) break;
      headingsByLayer.push({
        node: next.value[1][0],
        children: next.value[1].slice(1),
      });
    }
    return headingsByLayer;
  };

  return _partitionByLayer(headings);
};
