chrome.extension.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.msg == "forceRelayout") {
			chrome.windows.getCurrent({},function(wind) {
				// This is the only way to force a relayout to update the caret position
				let width = wind.width;
				chrome.windows.update(wind.id, { width: width - 1 });
				chrome.windows.update(wind.id, { width: width });
			});
		}
	}
);

