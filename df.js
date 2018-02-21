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

    #df-menu {
      top: 30px;
      left: 5px;
      display: none;
    }

    #df-menu-button {
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

    .df-default #df-menu-button {
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

    .df-dark #df-menu-button,
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
    .df-sepia #df-menu-button,
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

  const _printModeElementId = ":8g";

  var _containerSelector = ".docs-titlebar-badges"
  var _starSelector = ".docs-star-container"
  var _theme = "default";

  let _styleElement = document.createElement("style");
  _styleElement.innerText = _css;

  var _toolbarButtonContainer = document.createElement("div");
  _toolbarButtonContainer.className = "goog-inline-block";

  var _menuButtonElement = document.createElement("button");
  _menuButtonElement.id = "df-menu-button"
  _menuButtonElement.innerText = "▣";
  _menuButtonElement.addEventListener("click", openMenu);

  var _menu = document.createElement("div");
  _menu.id = "df-menu";
  _menu.className = "goog-menu goog-menu-vertical goog-menu-noicon goog-menu-noaccel";
  _menu.innerHTML = `

  <div class="goog-menuitem" role="option" id="df-mi-exit" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Exit</div></div>
  <div class="goog-menuitem" role="option" id="df-mi-zoom" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Set Zoom</div></div>
  <div class="goog-menuitem" role="option" id="df-mi-fullscreen" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Enter Full Screen</div></div>
  <div class="goog-menuseparator" role="separator" aria-disabled="true" id=":1n" style="user-select: none;"></div>
  <div class="goog-menuitem" role="option" id="df-mi-default" data-theme="default" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Default Mode</div></div>
  <div class="goog-menuitem" role="option" id="df-mi-dark" data-theme="dark" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Dark Mode</div></div>
  <div class="goog-menuitem" role="option" id="df-mi-sepia" data-theme="sepia" style="user-select: none;"><div class="goog-menuitem-content" style="user-select: none;">Sepia Mode</div></div>
  `;

  _menu.querySelector("#df-mi-zoom").addEventListener("click", openZoomMenu);
  _menu.querySelector("#df-mi-exit").addEventListener("click", exitMode);
  _menu.querySelector("#df-mi-default").addEventListener("click", handleThemeMenuItemClick);
  _menu.querySelector("#df-mi-dark").addEventListener("click", handleThemeMenuItemClick);
  _menu.querySelector("#df-mi-sepia").addEventListener("click", handleThemeMenuItemClick);
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

  function openMenu(evt) {
    _menu.style.display = "block";
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
    // Uncheck "Print Mode" if not already unchecked
    uncheckMenuItem($i(_printModeElementId));
    document.head.appendChild(_styleElement);
    document.body.appendChild(_menuButtonElement);
    document.body.appendChild(_menu);
    document.querySelector(".kix-appview-editor").style.height = "100vh";
    forceRelayout();
  }

  function exitMode() {
    document.head.removeChild(_styleElement);
    _menuButtonElement.parentElement.removeChild(_menuButtonElement);
    _menu.parentElement.removeChild(_menu);
    forceRelayout();
  }

  function handleOnLoad() {
    document.body.appendChild(_fadeElement);
    document.body.addEventListener("click", closeMenu);
    let containerElement = document.querySelector(_containerSelector);
    let starElement = document.querySelector(_starSelector);
    if (containerElement && starElement && window.location.href.indexOf("document") != -1) {
      setTimeout(function() {
        containerElement.insertBefore(_toolbarButtonContainer, starElement.nextSibling);
      }, 500)
    }

    setTheme(localStorage.getItem("df-theme", "default"));
  }

  function setTheme(theme) {
    _theme = theme;
    document.body.classList.remove("df-default", "df-dark", "df-sepia");
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
    _menu.querySelector("#df-mi-fullscreen .goog-menuitem-content").innerText = "Exit Full Screen";
  }

  function exitFullScreen() {
   if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } 
    _menu.querySelector("#df-mi-fullscreen .goog-menuitem-content").innerText = "Enter Full Screen";
  }
  
  document.addEventListener("DOMContentLoaded", handleOnLoad);
  if (document.body) {
    handleOnLoad();
  }
})();