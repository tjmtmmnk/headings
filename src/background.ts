const init = (tab: chrome.tabs.Tab) => {
  console.log("init");
  chrome.tabs.insertCSS({
    code: `
  body {
    margin-left: 350px !important;
    padding-left: 0 !important;
    position: relative !important;
    width: auto;
  }
`,
  });
};

chrome.browserAction.onClicked.addListener(init);
