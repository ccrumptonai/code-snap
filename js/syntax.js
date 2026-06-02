/* syntax.js — highlight.js wiring: language list, theme map, re-highlight. */
(() => {
  "use strict";

  const HLJS_CDN = "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.9.0/build/styles/";

  // theme key -> [highlight.js stylesheet name, window background, gutter/title color]
  const THEMES = {
    "Dracula":        ["base16/dracula",        "#282a36"],
    "GitHub Dark":    ["github-dark",           "#0d1117"],
    "Nord":           ["nord",                  "#2e3440"],
    "One Dark":       ["atom-one-dark",         "#282c34"],
    "Tokyo Night":    ["tokyo-night-dark",      "#1a1b26"],
    "Solarized Light":["base16/solarized-light","#fdf6e3"],
    "GitHub Light":   ["github",               "#ffffff"],
  };

  const LANGUAGES = [
    "javascript", "typescript", "python", "java", "go", "rust", "c", "cpp",
    "csharp", "php", "ruby", "swift", "kotlin", "html", "css", "json",
    "yaml", "bash", "sql", "markdown",
  ];

  function highlight(code, lang) {
    if (lang && window.hljs.getLanguage(lang)) {
      try { return window.hljs.highlight(code, { language: lang }).value; } catch (_) {}
    }
    return window.hljs.highlightAuto(code).value;
  }

  function themeBackground(name) { return (THEMES[name] || THEMES["Dracula"])[1]; }

  function setHljsStylesheet(name) {
    const file = (THEMES[name] || THEMES["Dracula"])[0];
    document.getElementById("hljs-theme").href = HLJS_CDN + file + ".min.css";
  }

  window.Syntax = { THEMES, LANGUAGES, highlight, themeBackground, setHljsStylesheet };
})();
