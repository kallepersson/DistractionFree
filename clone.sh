#!/bin/bash
while sleep 1; do
	cp df.js ./DistractionFree.safariextension/safari-df.js;
	cp df.js ./Chrome/chrome-df.js;
	cp df.js ./Firefox/firefox-df.js;
	cp -r img ./Firefox/
	cp -r img ./Chrome/
	cp img/icon-128.png ./DistractionFree.safariextension/Icon.png
done