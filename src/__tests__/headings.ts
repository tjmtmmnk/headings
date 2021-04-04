import { getHeadingsRoot } from "../headings";

describe("getHeadingsRoot", () => {
  // https://github.com/jsdom/jsdom/issues/1245
  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, "innerText", {
      get() {
        return this.textContent;
      },
    });
  });
  test("can get headings in one layer", () => {
    document.title = "test";
    document.body.innerHTML = `
    <div>
      <h1 id="id-1-1">H1-1</h1>
      <h2 id="id-1-2">H2-1</h2>
      <h3 id="id-1-3">H3-1</h3>
      <h2 id="id-2-1">H2-2</h2>
      <h3 id="id-2-2">H3-2</h3>
    </div>
    `;
    const body = document.querySelector<HTMLBodyElement>("body");
    const headingsRoot = getHeadingsRoot(body);

    const gotTexts1 = [
      headingsRoot.children[0].element.text,
      headingsRoot.children[0].children[0].element.text,
      headingsRoot.children[0].children[0].children[0].element.text,
    ];
    const gotTexts2 = [
      headingsRoot.children[1].element.text,
      headingsRoot.children[1].children[0].element.text,
    ];

    expect(gotTexts1).toEqual(["H1-1", "H2-1", "H3-1"]);
    expect(gotTexts2).toEqual(["H2-2", "H3-2"]);
  });
});
