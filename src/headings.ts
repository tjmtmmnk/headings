export interface IHeading {
  text: string;
  tag: string;
  layer: number;
  element: HTMLElement;
}

const isHeading = (e: HTMLElement): boolean => {
  return !!e.tagName.match("^H[1-4]$");
};

export const getHeadings = (root: HTMLElement | null): IHeading[] => {
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

  return headings;
};
