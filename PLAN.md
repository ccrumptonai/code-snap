# Code Snap — Screenshot → Code Beautifier — Implementation Plan

## Goal
Paste code, get a beautiful shareable image (Carbon-style): syntax highlighting,
themes, window chrome, padding, rounded corners. Export as PNG or copy to
clipboard. Browser-only, no backend. Deployable on GitHub Pages.

## Success Criteria
- [ ] Editable code area with live syntax highlighting
- [ ] Language selector (auto-detect + manual)
- [ ] Multiple color themes (e.g. Dracula, GitHub, Nord, Solarized)
- [ ] Window chrome toggle (mac-style dots, title bar)
- [ ] Adjustable padding + background gradient/color
- [ ] Export PNG (download) and copy-image-to-clipboard
- [ ] Optional line numbers + watermark toggle
- [ ] Works by opening index.html directly — zero install

## Stack
- Vanilla JS + HTML + CSS (no framework)
- [highlight.js](https://highlightjs.org/) via CDN — highlighting + themes
- [html-to-image](https://github.com/bubkoo/html-to-image) via CDN — DOM → PNG
- Clipboard API for copy-to-clipboard

## Architecture
```
index.html      # controls panel + live preview canvas card
css/app.css     # controls + the "frame" being rendered to image
js/highlight.js # wire highlight.js, language list
js/render.js    # apply theme/padding/chrome/background to the frame
js/export.js    # html-to-image → PNG download / clipboard
```

## Build Sequence
1. Layout: controls sidebar + centered preview "frame"
2. Code area + highlight.js live highlighting + language picker
3. Theme picker (swap highlight.js theme stylesheets)
4. Frame controls: padding, background color/gradient, rounded corners
5. Window chrome (traffic-light dots + optional title)
6. Export: html-to-image → PNG download
7. Copy-to-clipboard + line numbers + watermark toggles
8. README + demo GIF + GitHub Pages deploy

## Out of Scope (v1)
- Server-side image rendering
- Custom font upload
- Multi-snippet / diff view
