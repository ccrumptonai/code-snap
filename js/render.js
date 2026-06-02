/* render.js — apply the current control values to the export frame. */
(() => {
  "use strict";

  const els = {
    frame: document.getElementById("frame"),
    window: document.getElementById("window"),
    titlebar: document.getElementById("titlebar"),
    titleLabel: document.getElementById("title-label"),
    wrap: document.querySelector(".editor-wrap"),
    gutter: document.getElementById("gutter"),
    codeHl: document.getElementById("code-hl"),
    input: document.getElementById("code-input"),
    watermark: document.getElementById("watermark"),
  };

  /** Re-highlight the code layer from the textarea value. */
  function renderCode(lang) {
    els.codeHl.innerHTML = window.Syntax.highlight(els.input.value, lang);
    updateGutter();
  }

  function updateGutter() {
    if (els.gutter.hidden) return;
    const count = els.input.value.split("\n").length;
    let s = "";
    for (let i = 1; i <= count; i++) s += i + "\n";
    els.gutter.textContent = s;
  }

  function setTheme(name) {
    window.Syntax.setHljsStylesheet(name);
    els.window.style.background = window.Syntax.themeBackground(name);
  }

  function setBackground(value) { els.frame.style.background = value; }
  function setPadding(px) { els.frame.style.padding = px + "px"; }
  function setChrome(on) { els.titlebar.style.display = on ? "flex" : "none"; }
  function setTitle(text) { els.titleLabel.textContent = text; }
  function setLineNumbers(on) {
    els.gutter.hidden = !on;
    els.wrap.classList.toggle("with-lines", on);
    updateGutter();
  }
  function setWatermark(on) { els.watermark.hidden = !on; }

  window.Render = {
    els, renderCode, setTheme, setBackground, setPadding,
    setChrome, setTitle, setLineNumbers, setWatermark,
  };
})();
