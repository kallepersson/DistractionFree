chrome.runtime.onMessage.addListener(({ type, name }) => {
	chrome.windows.getCurrent({},function(wind) {
		// This is the only way to force a relayout to update the caret position
		let width = wind.width;
		chrome.windows.update(wind.id, { width: width - 1 });
		chrome.windows.update(wind.id, { width: width });
	});
});