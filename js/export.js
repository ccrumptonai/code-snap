/* export.js — snapshot the frame to PNG (download) or the clipboard. */
(() => {
  "use strict";

  const frame = document.getElementById("frame");
  const status = document.getElementById("status");

  function flash(msg, isError) {
    status.textContent = msg;
    status.style.color = isError ? "#ff6b6b" : "";
    setTimeout(() => { if (status.textContent === msg) status.textContent = ""; }, 2500);
  }

  // Hide the caret during capture so it doesn't appear in the image.
  function withoutCaret(fn) {
    const input = document.getElementById("code-input");
    const prev = input.style.caretColor;
    input.style.caretColor = "transparent";
    input.blur();
    return fn().finally(() => { input.style.caretColor = prev; });
  }

  function options() {
    return { pixelRatio: 2, cacheBust: true };
  }

  async function downloadPNG() {
    try {
      const url = await withoutCaret(() => window.htmlToImage.toPng(frame, options()));
      const a = document.createElement("a");
      a.href = url; a.download = "code-snap.png";
      document.body.appendChild(a); a.click(); a.remove();
      flash("Saved code-snap.png");
    } catch (e) { flash("Export failed: " + e.message, true); }
  }

  async function copyToClipboard() {
    try {
      const blob = await withoutCaret(() => window.htmlToImage.toBlob(frame, options()));
      if (!navigator.clipboard || !window.ClipboardItem) throw new Error("Clipboard images unsupported");
      await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
      flash("Copied to clipboard");
    } catch (e) { flash("Copy failed: " + e.message, true); }
  }

  window.Exporter = { downloadPNG, copyToClipboard };
})();
