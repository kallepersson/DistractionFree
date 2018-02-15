(function() {

  const _css = `

    body:-webkit-full-screen {
      width: 100%;
      height: 100%;
    }

    .kix-document-top-shadow-inner, #docs-instant-button-bubble { 
      display: none;
    }

    .docs-slidingdialog-holder {
      z-index: 1000;
    }

    #docs-chrome,
    #kix-ruler,
    .docs-explore-widget,
    .docs-df-hidemenus .goog-menu-vertical {
     pointer-events: none;
     opacity: 0;
    }

    #docs-chrome {
      display: none;
    }

    .gdocs-df-fade {
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

    .kix-page-compact::before {
     border: 0;
    }

    .gdocs-exit-mode-button,
    .gdocs-df-zoom-button {
      position: fixed;
      top: 0;
      left: 0;
      font-size: 22px;
      line-height: 25px;
      background: transparent;
      border: 0;
      opacity: 0.2;
      cursor: pointer;
      z-index: 1000;
      color: #000;
    }
    
    .gdocs-exit-mode-button:hover,
    .gdocs-df-zoom-button:hover {
     opacity: 0.8;
    }

    .gdocs-df-zoom-button {
      top: 5px;
      left: 40px;
      font-size: 12px;
      line-height: 12px;
    }

    .gdocs-df-zoom-button:hover {
      opacity: 0.8;
    }

    #docs-chrome,
    #docs-editor,
    .kix-page,
    .docs-ui-unprintable,
    .kix-page-content-wrapper {
     background: transparent!important;
    }

    .kix-commentoverlayrenderer-highlighted {
      background: #ffe168!important;
    }

    .kix-paginateddocumentplugin-compact-mode,
    .kix-page-paginated,
    .kik-page {
     box-shadow: none!important;

    }

    /** DEFAULT **/

    .df-default #docs-editor-container {
     background: #eee!important;
    }

    .df-default .gdocs-exit-mode-button,
    .df-default .gdocs-df-zoom-button {
     color: #000!important;
    }

    .df-default .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(238,238,238,1) 85%, rgba(238,238,238,0) 100%);

    }
    .df-default .kix-selection-overlay {
      background: #76a7fa!important;
      border-color: #76a7fa!important;
    }

    /** DARK **/

    .df-dark ::-webkit-scrollbar-thumb {
      background-color: rgba(255,255,255,.2);
    }

    .df-dark #docs-editor-container {
     background: #000!important;

    }

    .df-dark .kix-cursor-caret {
      border-color: #fff!important;
    }

    .df-dark .gdocs-exit-mode-button,
    .df-dark .gdocs-df-zoom-button,
    .df-dark .kix-wordhtmlgenerator-word-node,
    .df-dark .kix-lineview-text-block {
     color: #fff!important;
    }

    .df-dark .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(0,0,0,1) 85%,rgba(0,0,0,0) 100%);

    }

    .df-dark tr, .df-dark td {
     border-color: #fff!important;

    }

    .df-dark .kix-selection-overlay {
      background: #6A6A6A!important;
      border-color: #6A6A6A!important;
    }

    .df-dark .kix-commentoverlayrenderer-highlighted {
      background: #325e80!important;
    }

    /** SEPIA **/

    .df-sepia #docs-editor-container {
     background: rgba(244,236,217,1)!important;

    }
    .df-sepia .gdocs-exit-mode-button,
    .df-sepia .gdocs-df-zoom-button,
    .df-sepia .kix-wordhtmlgenerator-word-node,
    .df-sepia .goog-inline-block kix-lineview-text-block {
     color: #644F48!important;
    }

    .df-sepia .kix-cursor-caret {
      border-color: #644F48!important;
    }

    .df-sepia .gdocs-df-fade {
     background: -webkit-linear-gradient(top, rgba(244,236,217,1) 85%,rgba(244,236,217,0) 100%);
    }

    .df-sepia .kix-selection-overlay {
      background: #F8E71C!important;
      border-color: #F8E71C!important;
    }
  `;

  var _containerSelector = ".docs-titlebar-badges"
  var _starSelector = ".docs-star-container"
  var _theme = "default";

  let _styleElement = document.createElement("style");
  _styleElement.innerText = _css;

  var _toolbarButtonContainer = document.createElement("div");
  _toolbarButtonContainer.className = "goog-inline-block";
  _toolbarButtonContainer

  var _enterModeButton = document.createElement("button");
  _toolbarButtonContainer.appendChild(_enterModeButton);
  _enterModeButton.className = "docs-toggle-df goog-inline-block"
  _enterModeButton.innerText = "▣";
  _enterModeButton.dataset.tooltip = "Enter distraction free mode";
  _enterModeButton.style = `background: transparent; border: 0; font-size: 22px; opacity: 0.8; color: #737373; cursor: pointer`
  _enterModeButton.addEventListener("mouseover", function() {
    this.style.opacity = 1;
  });
  _enterModeButton.addEventListener("mouseout", function() {
    this.style.opacity = 0.8;
  });
  _enterModeButton.addEventListener("click", enterMode);

  var _exitModeButtonElement = document.createElement("button");
  _exitModeButtonElement.className = "gdocs-exit-mode-button"
  _exitModeButtonElement.innerText = "←";
  _exitModeButtonElement.addEventListener("click", exitMode);

  var _zoomSelectElement = document.createElement("button");
  _zoomSelectElement.innerText = "Zoom";
  _zoomSelectElement.className = "gdocs-df-zoom-button";
  _zoomSelectElement.addEventListener("click", openZoomMenu);

  var _fadeElement = document.createElement("div");
  _fadeElement.className = "gdocs-df-fade"

  function uncheckMenuItem(element) {
    if (!element.classList.contains("goog-option-selected")) {
      return;
    }
    clickInterfaceElement(element);
  }

  function clickInterfaceElement(element) {
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
    if (typeof chrome != "undefined") {
      chrome.extension.sendMessage({ msg: "forceRelayout" });
    } else if (typeof safari != "undefined") {
      safari.self.tab.dispatchMessage("forceRelayout");
    }
  }

  function enterMode() {
    // Uncheck "Print Mode" if not already unchecked
    uncheckMenuItem($i(":8g"));
    document.head.appendChild(_styleElement);
    document.body.appendChild(_exitModeButtonElement);
    document.body.appendChild(_zoomSelectElement);
    _zoomSelectElement.value = document.querySelector("#zoomSelect input").value;
    document.querySelector(".kix-appview-editor").style.height = "100vh";
    forceRelayout();
  }

  function exitMode() {
    document.head.removeChild(_styleElement);
    _exitModeButtonElement.parentElement.removeChild(_exitModeButtonElement);
    _zoomSelectElement.parentElement.removeChild(_zoomSelectElement);
    forceRelayout();
  }

  function handleOnLoad() {
    document.body.appendChild(_fadeElement);
    let containerElement = document.querySelector(_containerSelector);
    let starElement = document.querySelector(_starSelector);
    if (containerElement && starElement && window.location.href.indexOf("document") != -1) {
      setTimeout(function() {
        containerElement.insertBefore(_toolbarButtonContainer, starElement.nextSibling);
      }, 500)
    }

    if (typeof chrome !== "undefined") {
      chrome.storage.sync.get({
        theme: _theme
      }, function(items) {
        setTheme(items.theme);
      });

      chrome.storage.onChanged.addListener(function(changes, namespace) {
        setTheme(changes.theme.newValue);
      });
    } else if (false && typeof safari !== "undefined") {
      setTheme(safari.extension.settings.theme || _theme);
      safari.extension.settings.addEventListener("change", function(event){
        if (event.key == "theme") {
          setTheme(event.newValue);
        }
      }, false);
    } else {
      // Set default theme until settings are implemented
      setTheme(_theme);
    }
  }

  function setTheme(theme) {
    _theme = theme;
    document.body.classList.remove("df-default", "df-dark", "df-sepia");
    document.body.classList.add("df-" + theme)
  }

  function openZoomMenu(evt) {
    clickInterfaceElement($i("zoomSelect"));
    let menus = Array.prototype.slice.call(document.querySelectorAll(".goog-menu-vertical"));
    let menu = menus.reverse().find(function(elm) {
      return elm.innerHTML.indexOf("100%") != -1;
    })
    if (menu) {
      menu.style.left = "40px";
      menu.style.top = "5px";
    }
  }

  function handleKeyDown(evt) {
    if (evt.keyCode == 27) {
      exitMode()
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