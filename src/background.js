window.onload = function (e) {
  alert("Vamos pesquisar!");

  function getword(info, tab) {
    chrome.tabs.create({
      url: "http://www.google.com/search?q=" + info.selectionText,
    });
  }
  chrome.contextMenus.create({
    title: "Search: %s",
    contexts: ["selection"],
    onclick: getword,
  });
};
