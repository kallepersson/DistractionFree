browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.msg != "forceRelayout") {
		return;
	}
	browser.windows.getCurrent({}).then(function(wind) {
		// This is the only way to force a relayout to update the caret position
		let width = wind.width;
		browser.windows.update(wind.id, { width: width - 1 });
		window.setTimeout(function() {
			browser.windows.update(wind.id, { width: width });
		}, 100)
	});
});

