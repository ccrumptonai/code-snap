/* app.js — populate controls, wire events, keep the overlay in sync. */
(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const langSel = $("lang"), themeSel = $("theme"), bgSel = $("bg");
  const pad = $("pad"), padVal = $("pad-val");
  const chrome = $("chrome"), lines = $("lines"), mark = $("mark");
  const titleText = $("title-text");
  const input = $("code-input"), codeLayer = document.querySelector(".code-layer");

  const SAMPLE = `// Greet everyone, beautifully.
function greet(names) {
  return names
    .map((n) => \`Hello, \${n}!\`)
    .join("\\n");
}

console.log(greet(["world", "Code Snap"]));`;

  // Populate language + theme dropdowns.
  window.Syntax.LANGUAGES.forEach((l) => {
    const o = document.createElement("option");
    o.value = l; o.textContent = l;
    if (l === "javascript") o.selected = true;
    langSel.appendChild(o);
  });
  Object.keys(window.Syntax.THEMES).forEach((name) => {
    const o = document.createElement("option");
    o.value = name; o.textContent = name;
    themeSel.appendChild(o);
  });

  function rerender() { window.Render.renderCode(langSel.value); }

  // Keep highlighted layer scrolled with the textarea.
  input.addEventListener("scroll", () => {
    codeLayer.scrollTop = input.scrollTop;
    codeLayer.scrollLeft = input.scrollLeft;
  });

  // Tab inserts two spaces instead of moving focus.
  input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const s = input.selectionStart, en = input.selectionEnd;
      input.value = input.value.slice(0, s) + "  " + input.value.slice(en);
      input.selectionStart = input.selectionEnd = s + 2;
      rerender();
    }
  });

  input.addEventListener("input", rerender);
  langSel.addEventListener("change", rerender);
  themeSel.addEventListener("change", () => window.Render.setTheme(themeSel.value));
  bgSel.addEventListener("change", () => window.Render.setBackground(bgSel.value));
  pad.addEventListener("input", () => { padVal.textContent = pad.value + "px"; window.Render.setPadding(pad.value); });
  chrome.addEventListener("change", () => window.Render.setChrome(chrome.checked));
  lines.addEventListener("change", () => window.Render.setLineNumbers(lines.checked));
  mark.addEventListener("change", () => window.Render.setWatermark(mark.checked));
  titleText.addEventListener("input", () => window.Render.setTitle(titleText.value));

  $("btn-png").addEventListener("click", () => window.Exporter.downloadPNG());
  $("btn-copy").addEventListener("click", () => window.Exporter.copyToClipboard());

  // ---- Init ---------------------------------------------------------------
  input.value = SAMPLE;
  window.Render.setTheme(themeSel.value);
  window.Render.setBackground(bgSel.value);
  window.Render.setPadding(pad.value);
  window.Render.setChrome(chrome.checked);
  window.Render.setLineNumbers(lines.checked);
  window.Render.setWatermark(mark.checked);
  window.Render.setTitle(titleText.value);
  rerender();
})();
