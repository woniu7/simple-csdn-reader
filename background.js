var oldId;
function onCreated(tab) {
  browser.tabs.remove(oldId);
}
function onError(error) {
  //console.log(`Error: ${error}`);
}

function switchToReaderMode(tabId, changeInfo, tab) {
//  if (changeInfo.isArticle) {
//    browser.tabs.toggleReaderMode(tabId);
//  }
  oldId = tab.id;
  var creating = browser.tabs.create({openInReaderMode: true, url: tab.url, index: tab.index, openerTabId: oldId});
  creating.then(onCreated, onError);
}

function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
    console.log("Tab: " + tabId +
                " URL changed to " + changeInfo.url);
    switchToReaderMode(tabId, changeInfo, tabInfo);
  }
}

browser.tabs.onUpdated.addListener(handleUpdated, {"urls": ["https://blog.csdn.net/*"]});
