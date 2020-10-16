// Copyright (c) Travis Plunk.
// Licensed under the MIT License.
// found in the LICENSE file.

'use strict';
function doInCurrentTab(tabCallback) {
  chrome.tabs.query(
      { currentWindow: true, active: true },
      function (tabArray) { tabCallback(tabArray[0]); }
  );
};

chrome.tabs.onCreated.addListener(function() {
  console.log('running listener1');
  doInCurrentTab( function(tab){
    var groupId = tab.groupId;
    console.log('The groupId is ' + groupId);
    if(groupId == -1)
    {
      console.log('grouping tab ' + tab.id);
      var options = {
        tabIds:tab.id,
        createProperties: {
          windowId:chrome.windows.WINDOW_ID_CURRENT
        }
      };
      chrome.tabs.group(options);
    }
  } );
});
