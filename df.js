(function() {

  const _css = `
    body:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }

    .df-enabled .kix-document-top-shadow-inner, #docs-instant-button-bubble { 
      display: none;
    }

    .df-enabled .docs-slidingdialog-holder {
      z-index: 1000;
    }

    #df-menu {
      top: 30px;
      left: 5px;
      display: none;
    }

    #df-menu-button {
      display: none;
    }

    .df-menuitem-theme::before {
      display: block;
      content: "";
      width: 10px;
      height: 10px;
      position: absolute;
      top: 10px;
      left: 15px;
      border-radius: 2px;
      border: 1px solid #111;
      box-shadow: inset 0 0 0 1px rgba(255,255,255,0.5);
    }

    .df-menuitem-theme {
      text-indent: 15px;
    }

    #df-mi-default::before { background-color: #eee; }
    #df-mi-paper::before { background-color: #fff; }
    #df-mi-dark::before { background-color: #222; }
    #df-mi-sepia::before { background-color: rgba(244,236,217,1); }
    #df-mi-midnight::before { background-color: #33353b; }

    .df-enabled #df-menu-button {
      display: block;
      position: fixed;
      font-family: arial, sans-serif;
      top: 0;
      left: 0;
      font-size: 22px;
      line-height: 30px;
      background: transparent;
      border: 0;
      opacity: 0.2;
      cursor: pointer;
      z-index: 1000;
      color: #000;
      outline: 0;
    }

    #df-menu-button:hover {
      opacity: 0.5;
    }

    #df-menu .goog-menuitem-content {
      pointer-events: none;
    }

    #df-menu .goog-menuitem:hover {
      background: #eee;
    }

    .df-enabled #docs-chrome,
    .df-enabled #kix-horizontal-ruler,
    .df-enabled .docs-explore-widget {
     pointer-events: none;
     opacity: 0;
    }

    .docs-df-hidemenus .goog-menu {
      opacity: 0.0 !important;
    }

    .df-enabled #docs-chrome {
      display: none;
    }

    .df-enabled .docs-navigation-tab-button {
      display: none;
    }

    .df-enabled .docs-companion-app-switcher-container {
      display: none;
    }

    .df-enabled #docs-editor.companion-enabled {
      width: 100% !important;
    }

    .gdocs-df-fade {
      display: none;
    }

    .df-enabled .gdocs-df-fade {
     display: block;
     position: fixed;
     top: 0;
     left: 0;
     display: block;
     right: 0;
     background: transparent;
     content: "";
     height: 25px;
     z-index: 999;
     pointer-events:none;
    }

    .df-enabled .kix-page-compact::before {
     border: 0;
    }

    .df-enabled #docs-chrome,
    .df-enabled #docs-editor,
    .df-enabled .kix-page,
    .df-enabled .docs-ui-unprintable,
    .df-enabled .kix-page-content-wrapper {
     background: transparent!important;
    }

    .df-enabled .kix-commentoverlayrenderer-highlighted {
      background: #ffe168!important;
    }

    .df-enabled .kix-paginateddocumentplugin-compact-mode,
    .df-enabled .kix-page-paginated,
    .df-enabled .kik-page {
     box-shadow: none!important;
    }

    /** SLIDES **/
    .df-enabled.df-slides .two-panel-layout .filmstrip,
    .df-enabled.df-slides #sketchy-horizontal-ruler,
    .df-enabled.df-slides #sketchy-vertical-ruler,
    .df-enabled.df-slides .speakernotes-dragger-thumb {
      display: none;
    }

    .df-enabled.df-slides #speakernotes,
    .df-enabled.df-slides #speakernotes-dragger {
      background: transparent!important;
      border-bottom-width: 0;
    }

    .df-enabled.df-slides #canvas {
      border: 0 !important;
      background-image: none;
      box-shadow: none !important;
    }

    /** DEFAULT **/
    .df-enabled.df-default,
    .df-enabled.df-default #docs-editor-container,
    .df-enabled.df-default #workspace-container,
    .df-enabled.df-default #workspace {
     background: #eee!important;
    }

    .df-enabled.df-slides #speakernotes-dragger {
      border-color: rgba(0,0,0,0.4)
    }

    .df-enabled.df-default #df-menu-button {
     color: #000!important;
    }

    .df-enabled.df-default .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(238,238,238,1) 85%, rgba(238,238,238,0) 100%);

    }
    .df-enabled.df-default .kix-selection-overlay {
      background: #76a7fa!important;
      border-color: #76a7fa!important;
    }

    /** PAPER **/

    .df-enabled.df-paper #docs-editor-container {
     background: #fff!important;
    }

    .df-enabled.df-paper #df-menu-button {
     color: #000!important;
    }

    .df-enabled.df-paper .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(255,255,255,1) 85%, rgba(255,255,255,0) 100%);

    }
    .df-enabled.df-paper .kix-selection-overlay {
      background: #76a7fa!important;
      border-color: #76a7fa!important;
    }

    /** DARK **/

    .df-enabled.df-dark ::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.2);
    }

    .df-enabled.df-dark,
    .df-enabled.df-dark #docs-editor-container,
    .df-enabled.df-dark #workspace-container,
    .df-enabled.df-dark #workspace {
      background: #000!important;
    }

    .df-enabled.df-slides.df-dark #speakernotes-dragger {
      border-color: rgba(255,255,255,0.1)
    }

    .df-enabled.df-dark .kix-cursor-caret {
      border-color: #ddd!important;
    }

    .df-enabled.df-dark.df-slides #speakernotes svg rect {
      fill: #ddd!important;
    }

    .df-enabled.df-dark #df-menu-button,
    .df-enabled.df-dark .kix-wordhtmlgenerator-word-node,
    .df-enabled.df-dark .kix-lineview-text-block {
     color: #ddd!important;
    }

    .df-enabled.df-dark .sketchy-text-content-text text {
     fill: #ddd!important; 
    }

    .df-enabled.df-dark .kix-lineview-decorations div {
      border-color: #ddd!important;
    }

    .df-enabled.df-dark .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(0,0,0,1) 85%,rgba(0,0,0,0) 100%);

    }

    .df-enabled.df-dark tr,
    .df-enabled.df-dark td {
      border-color: #fff!important;
    }

    .df-enabled.df-dark .kix-selection-overlay {
      background: #6A6A6A!important;
      border-color: #6A6A6A!important;
    }

    .df-enabled.df-dark .kix-commentoverlayrenderer-highlighted {
      background: #325e80!important;
    }

    .df-enabled.df-dark .goog-menu {
      background-color: #111;
    }

    .df-enabled.df-dark .goog-menuitem:hover {
      color: #000;
    }

    .df-enabled.df-dark .df-menuitem-theme::before {
      border: 1px solid #eee;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.5);
    }

    .df-enabled.df-dark .goog-menuitem:hover .docs-icon-img-container {
      filter: invert(0%);
    }

    .df-enabled.df-dark .docs-icon-img-container {
      filter: invert(100%);
    }

    .df-enabled.df-dark .goog-menuitem {
      color: #ccc;
    }

    /** SEPIA **/

    .df-enabled.df-sepia,
    .df-enabled.df-sepia #docs-editor-container,
    .df-enabled.df-sepia #workspace-container,
    .df-enabled.df-sepia #workspace {
     background: rgb(244,236,217)!important;

    }
    .df-enabled.df-sepia #df-menu-button,
    .df-enabled.df-sepia .kix-wordhtmlgenerator-word-node,
    .df-enabled.df-sepia .goog-inline-block.kix-lineview-text-block {
     color: #644F48!important;
    }

    .df-enabled.df-slides.df-sepia #speakernotes-dragger {
      border-color: rgba(185,168,128,0.4)
    }

    .df-enabled.df-sepia .sketchy-text-content-text text {
     fill: #644F48!important; 
    }

    .df-enabled.df-sepia .kix-lineview-decorations div {
      border-color: #644F48!important;
    }

    .df-enabled.df-sepia .kix-cursor-caret {
      border-color: #644F48!important;
    }

    .df-enabled.df-sepia.df-slides #speakernotes svg rect {
      fill: #644F48!important;
    }

    .df-enabled.df-sepia .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(244,236,217,1) 85%,rgba(244,236,217,0) 100%);
    }

    .df-enabled.df-sepia .kix-selection-overlay {
      background: #62aed2!important;
      border-color: #62aed2!important;
    }

    /** MIDNIGHT **/

    .df-enabled.df-midnight,
    .df-enabled.df-midnight #docs-editor-container,
    .df-enabled.df-midnight #workspace-container,
    .df-enabled.df-midnight #workspace {
     background: #33353b!important;
    }

    .df-enabled.df-slides.df-midnight #speakernotes-dragger {
      border-color: rgba(255,255,255,0.1)
    }

    .df-enabled.df-midnight #df-menu-button,
    .df-enabled.df-midnight .kix-wordhtmlgenerator-word-node,
    .df-enabled.df-midnight .goog-inline-block.kix-lineview-text-block {
     color: #aaaaaa!important;
    }

    .df-enabled.df-midnight .sketchy-text-content-text text {
     fill: #aaaaaa!important; 
    }

    .df-enabled.df-midnight .kix-lineview-decorations div {
      border-color: #aaaaaa!important;
    }

    .df-enabled.df-midnight .kix-cursor-caret {
      border-color: #aaaaaa!important;
    }

    .df-enabled.df-midnight.df-slides #speakernotes svg rect {
      fill: #aaa!important;
    }

    .df-enabled.df-midnight .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(51,53,59,1) 85%,rgba(51,53,59,0) 100%);
    }

    .df-enabled.df-midnight .kix-selection-overlay {
      background: rgb(81,83,89)!important;
      border-color: rgb(81,83,89)!important;
    }

  `;

  const _themes = [
    {key:"default", title:"Default theme"},
    {key:"paper", title:"Paper"},
    {key:"sepia", title:"Sepia"},
    {key:"midnight", title:"Midnight"},
    {key:"dark", title:"Dark"},
  ];

  var _isDocsApp = (window.location.href.indexOf("document") != -1);
  var _isSlidesApp = (window.location.href.indexOf("presentation") != -1);
  if (_isDocsApp) {
    document.body.classList.add("df-docs");
  } else if (_isSlidesApp) {
    document.body.classList.add("df-slides");
  }
  var _containerSelector = "#docs-titlebar-edit-badges";
  var _starSelector = ".docs-star-container";
  var _theme = "default";

  let _styleElement = document.createElement("style");
  _styleElement.innerText = _css;

  var _toolbarButtonContainer = document.createElement("div");
  _toolbarButtonContainer.className = "goog-inline-block";

  var _menuButtonElement = document.createElement("button");
  _menuButtonElement.id = "df-menu-button"
  _menuButtonElement.innerText = "▣";
  _menuButtonElement.addEventListener("click", toggleMenu);

  var _menu = document.createElement("div");
  _menu.id = "df-menu";
  _menu.className = "goog-menu goog-menu-vertical goog-menu-noicon goog-menu-noaccel";
  var menuHTML = `
  <div class="goog-menuitem" role="option" id="df-mi-exit" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Exit</div></div>
  <div class="goog-menuitem" role="option" id="df-mi-zoom" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Set Zoom</div></div>
  <div class="goog-menuitem" role="option" id="df-mi-fullscreen" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Toggle Full Screen</div></div>
  <div class="goog-menuseparator" role="separator" aria-disabled="true" id=":1n" style="user-select: none;"></div>
  `;
  _themes.forEach(function(theme) {
    menuHTML += `<div class="goog-menuitem df-menuitem-theme" role="option" id="df-mi-${theme.key}" data-theme="${theme.key}" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">${theme.title}</div></div>`;
  })
  menuHTML += `
  <div class="goog-menuseparator" role="separator" aria-disabled="true" id=":1n" style="user-select: none;"></div>
  <div class="goog-menuitem" role="option" id="df-mi-feedback" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Submit feedback</div></div>
  `;
  _menu.innerHTML = menuHTML;
  _menu.querySelector("#df-mi-feedback").addEventListener("click", openFeedbackForm);
  _menu.querySelector("#df-mi-zoom").addEventListener("click", openZoomMenu);
  _menu.querySelector("#df-mi-exit").addEventListener("click", exitMode);
  _themes.forEach(function(theme) {
    _menu.querySelector("#df-mi-"+theme.key).addEventListener("click", handleThemeMenuItemClick);
  })
  _menu.querySelector("#df-mi-fullscreen").addEventListener("click", toggleFullScreen);

  var _enterModeButton = document.createElement("div");
  _toolbarButtonContainer.appendChild(_enterModeButton);
  _enterModeButton.style = `
    background: transparent;
    border: 0;
    font-size: 22px;
    opacity: 0.8;
    color: #737373;
    cursor: pointer;
  `;
  _enterModeButton.className = "goog-inline-block"
  _enterModeButton.innerText = "▣";
  _enterModeButton.dataset.tooltip = "Enter distraction free mode";
  _enterModeButton.addEventListener("mouseover", function() {
    this.style.opacity = 1;
  });
  _enterModeButton.addEventListener("mouseout", function() {
    this.style.opacity = 0.8;
  });
  _enterModeButton.addEventListener("click", enterMode);

  var _fadeElement = document.createElement("div");
  _fadeElement.className = "gdocs-df-fade"

  function toggleMenu(evt) {
    _menu.style.display = _menu.style.display == "block" ? "none" : "block";
  }

  function closeMenu(evt) {
    if (evt.target.id == "df-menu-button") {
      return;
    }
   _menu.style.display = "none";
  }

  function handleThemeMenuItemClick(evt) {
    setTheme(evt.target.dataset.theme);
  }

  function uncheckMenuItem(element) {
    if (!element) {
      return;
    }

    if (!element.classList.contains("goog-option-selected")) {
      return;
    }
    clickInterfaceElement(element);
  }

  function clickInterfaceElement(element) {
    if (!element) {
      return;
    }
    var downEvent = document.createEvent("MouseEvents");
    downEvent.initEvent ("mousedown", true, true);
    var upEvent = document.createEvent("MouseEvents");
    upEvent.initEvent ("mouseup", true, true);

    element.dispatchEvent(downEvent);
    element.dispatchEvent(upEvent);
  }

  function $i(id) {
    return document.getElementById(id);
  }

  function forceRelayout() {
    if (typeof browser != "undefined") {
      browser.runtime.sendMessage({ msg: "forceRelayout" });
    } else if (typeof chrome != "undefined") {
      chrome.extension.sendMessage({ msg: "forceRelayout" });
    } else if (typeof safari != "undefined") {
      safari.self.tab.dispatchMessage("forceRelayout");
    } 
  }

  function enterMode() {
    localStorage.setItem(extractURL(), true);
    if (_isDocsApp) {
      // Uncheck "Print Mode" if not already unchecked
      attempt(function() {
        document.body.classList.add("docs-df-hidemenus");
        clickInterfaceElement($i("docs-view-menu"));
        let menuElements = document.querySelectorAll(".goog-menu");
        let checkbox;
        menuElements.forEach(function(menuElement) {
          let display = getComputedStyle(menuElement).display;
          if (display != "none") {
            checkbox = menuElement.querySelector(".goog-menuitem.apps-menuitem.goog-option:first-child");
          }
        })
        return checkbox;
      }, function(checkbox) {
      // For some reason this is the only way to make it work
        uncheckMenuItem(checkbox);
        uncheckMenuItem(checkbox);
        document.body.classList.add("df-enabled");
        document.body.appendChild(_menuButtonElement);
        document.body.appendChild(_menu);
        document.querySelector(".kix-appview-editor").style.height = "100vh";
        document.body.classList.remove("docs-df-hidemenus");
        clickInterfaceElement(document.body);
        forceRelayout();
      }, function() {
        // Failure
      });
    } else if (_isSlidesApp) {
        document.body.classList.add("df-enabled");
        document.body.appendChild(_menuButtonElement);
        document.body.appendChild(_menu);
        forceRelayout();
    }
  }

  function attempt(lookup, success, failure, maxTries, ms) {
    if (!maxTries) {
      maxTries = 50;
    }
    if (!ms) {
      ms = 100;
    }
    var numberTries = 0;
    var fn = function() {
      var result = lookup();
      if (result) {
        success(result);
      } else {
        if (numberTries < maxTries) {
          numberTries++;
          window.setTimeout(fn, ms);
        } else {
          failure();
        }
      }
    }
    window.setTimeout(fn, ms);
  }

  function exitMode() {
    document.body.classList.remove("df-enabled");
    _menuButtonElement.parentElement.removeChild(_menuButtonElement);
    _menu.parentElement.removeChild(_menu);
    forceRelayout();
    localStorage.removeItem(extractURL());
  }

  function handleOnLoad() {
    document.head.appendChild(_styleElement);
    if (_isDocsApp) {
      document.body.appendChild(_fadeElement);
    }
    document.body.addEventListener("click", closeMenu);
    let containerElement = document.querySelector(_containerSelector);
    let starElement = document.querySelector(_starSelector);
    if (containerElement && starElement && (_isDocsApp || _isSlidesApp)) {
      setTimeout(function() {
        containerElement.insertBefore(_toolbarButtonContainer, starElement.nextSibling);
      }, 500)
    }

    setTheme(localStorage.getItem("df-theme"));
    if (localStorage.getItem(extractURL())) {
      enterMode();
    }
  }

  function extractURL() {
    return window.location.href.split("#")[0];
  }

  function setTheme(theme) {
    if (!theme) {
      theme = "default";
    }
    _theme = theme;
    _themes.forEach(function(theme) {
      document.body.classList.remove("df-" + theme.key);
    });
    document.body.classList.add("df-" + theme)
    localStorage.setItem("df-theme", theme);
  }

  function openZoomMenu(evt) {
    clickInterfaceElement($i("zoomSelect"));
    let menus = Array.prototype.slice.call(document.querySelectorAll(".goog-menu-vertical"));
    let menu = menus.reverse().find(function(elm) {
      return elm.innerHTML.indexOf("100%") != -1;
    })
    if (menu) {
      menu.style.left = "5px";
      menu.style.top = "5px";
    }
  }

  function openFeedbackForm(evt) {
    window.open("https://goo.gl/forms/r2Kf8bYa15yE4Tzm1");
  }

  function handleKeyDown(evt) {
    if (evt.keyCode == 27) {
      exitMode()
    }
  }

  function toggleFullScreen() {
    if (document.webkitFullscreenElement || document.mozFullScreenElement) {
      exitFullScreen();
    } else if (!document.webkitFullscreenElement && !document.mozFullScreenElement) {
      enterFullScreen();
    }
  }

  function enterFullScreen() {
    if (document.body.webkitRequestFullScreen) {
      document.body.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (document.body.mozRequestFullScreen) {
      document.body.mozRequestFullScreen();
    }
  }

  function exitFullScreen() {
   if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } 
  }
  
  document.addEventListener("DOMContentLoaded", handleOnLoad);
  if (document.body) {
    handleOnLoad();
  }
})();