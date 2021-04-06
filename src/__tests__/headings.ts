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
      <h1>H1-1</h1>
      <h1>H1-2</h1>
      <h1>H1-3</h1>
    `;
    const body = document.querySelector<HTMLBodyElement>("body");
    const headingsRoot = getHeadingsRoot(body);

    expect(headingsRoot.element.text).toBe("test");

    const gotTexts = [
      headingsRoot.children[0].element.text,
      headingsRoot.children[1].element.text,
      headingsRoot.children[2].element.text,
    ];

    expect(gotTexts).toEqual(["H1-1", "H1-2", "H1-3"]);
  });

  test("can get out-of-order headings in one layer", () => {
    document.body.innerHTML = `
      <h2>H2-1</h2>
      <h1>H1-1</h1>
      <h1>H1-2</h1>
    `;
    const body = document.querySelector<HTMLBodyElement>("body");
    const headingsRoot = getHeadingsRoot(body);

    const gotTexts = [
      headingsRoot.children[0].element.text,
      headingsRoot.children[1].element.text,
      headingsRoot.children[2].element.text,
    ];

    expect(gotTexts).toEqual(["H2-1", "H1-1", "H1-2"]);
  });

  test("can get headings in multi layer", () => {
    document.body.innerHTML = `
      <h1>H1-1</h1>
      <h2>H2-1</h2>
      <h3>H3-1</h3>
      <h2>H2-2</h2>
      <h3>H3-2</h3>
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
