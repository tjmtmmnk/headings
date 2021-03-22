export interface IHeading {
  text: string;
  tag: string;
  layer: number;
}

const isHeading = (e: HTMLElement): boolean => {
  return !!e.tagName.match("^H[1-4]$");
};

export const getHeadings = (root: HTMLElement | null): IHeading[] => {
  if (!root) return [];
  const headings: IHeading[] = [];
  let currentHeading = "";
  let layer = 0;
  const _walk = (p: HTMLElement) => {
    if (!p) return;

    if (isHeading(p)) {
      if (currentHeading === "" || currentHeading >= p.tagName) {
        currentHeading = p.tagName;
        layer++;
      }
      if (currentHeading === "H1") {
        currentHeading = p.tagName;
      }
      headings.push({
        text: p.innerText,
        tag: p.tagName,
        layer: layer,
      });
    }
    for (const c of Array.from(p.children)) {
      if (c instanceof HTMLElement) {
        _walk(c);
      }
    }
  };

  _walk(root);

  return headings;
};
