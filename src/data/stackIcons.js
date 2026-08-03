/** Compact inline SVGs for stack pill logos */
const svg = (paths, viewBox = "0 0 24 24") =>
  `<svg viewBox="${viewBox}" aria-hidden="true" focusable="false">${paths}</svg>`;

export const I = {
  figma: svg(
    `<path fill="#F24E1E" d="M8 24a4 4 0 0 0 4-4v-4H8a4 4 0 1 0 0 8Z"/><path fill="#A259FF" d="M4 12a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z"/><path fill="#1ABCFE" d="M12 4h4a4 4 0 1 1 0 8h-4V4Z"/><path fill="#0ACF83" d="M4 4a4 4 0 0 1 4-4h4v8H8a4 4 0 0 1-4-4Z"/><circle cx="16" cy="12" r="4" fill="#FF7262"/>`
  ),
  canva: svg(
    `<circle cx="12" cy="12" r="10" fill="#00C4CC"/><path fill="#fff" d="M8.2 14.8c1.1 1.4 2.5 2.1 4.1 2.1 2.6 0 4.5-1.7 4.5-4.1 0-2.3-1.7-3.7-4-3.7-1.1 0-2 .3-2.9.9l.5 1.4c.6-.4 1.2-.7 2-.7 1.3 0 2.1.8 2.1 2 0 1.3-1 2.2-2.4 2.2-.8 0-1.5-.3-2.1-1l-.8 1Z"/>`
  ),
  react: svg(
    `<circle cx="12" cy="12" r="2.2" fill="#61DAFB"/><g fill="none" stroke="#61DAFB" stroke-width="1.4"><ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/></g>`
  ),
  flutter: svg(
    `<path fill="#54C5F8" d="M14.1 2 3.5 12.6l3.4 3.4L20.9 2z"/><path fill="#01579B" d="m14.1 13.3-3.7 3.7 3.7 3.7H20.9l-3.7-3.7 3.7-3.7z"/><path fill="#29B6F6" d="m10.4 17 3.7-3.7 3.4 3.4-3.4 3.4z"/>`
  ),
  python: svg(
    `<path fill="#3776AB" d="M12.1 2c-2.4 0-2.2.9-2.2 2.1v1.5h4.4v.5H7.4C5.5 6.1 4 7.4 4 10.1c0 2.6 1.1 4 3.4 4h2.1v-1.8c0-1.9 1.6-3.5 3.6-3.5h3.4c1.7 0 3.1-1.4 3.1-3.1V4.1C19.6 2.6 17.6 2 12.1 2Zm-1.4 1.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9Z"/><path fill="#FFD43B" d="M11.9 22c2.4 0 2.2-.9 2.2-2.1v-1.5H9.7v-.5h6.9c1.9 0 3.4-1.3 3.4-4 0-2.6-1.1-4-3.4-4h-2.1v1.8c0 1.9-1.7 3.5-3.6 3.5H7.5c-1.7 0-3.1 1.4-3.1 3.1v2.1C4.4 21.4 6.4 22 11.9 22Zm1.4-1.3c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9Z"/>`
  ),
  django: svg(
    `<rect width="24" height="24" rx="5" fill="#092E20"/><path fill="#fff" d="M8.5 5.8h2.2v9.5c0 2.6-1.3 3.7-3.5 3.7-.7 0-1.5-.1-2-.4l.35-1.7c.35.15.85.25 1.3.25 1 0 1.65-.55 1.65-2.05V5.8Zm5.2 3.8h2v7.8h-2V9.6Zm1-2.3c.7 0 1.25-.55 1.25-1.25S15.4 4.8 14.7 4.8s-1.25.55-1.25 1.25.55 1.25 1.25 1.25Z"/>`
  ),
  php: svg(
    `<ellipse cx="12" cy="12" rx="11" ry="7.5" fill="#777BB4"/><path fill="#fff" d="M7.2 9.6h1.7l.9 4.3.9-4.3h1.6l-1.6 6.2H9.1L7.2 9.6Zm6.1 0h2.6c1.5 0 2.5.8 2.5 2.2 0 1.5-1.1 2.3-2.7 2.3h-.9l-.4 1.7h-1.6l1.1-6.2Zm1.6 1.4-.4 2.1h.8c.7 0 1.1-.3 1.1-1s-.3-1.1-1-1.1h-.5Z"/>`
  ),
  mysql: svg(
    `<path fill="#00758F" d="M4 16.5c2.2.4 3.8.3 5.3-.5 1.3.7 2.8 1.1 4.7.9.2-.9.5-1.8.8-2.6-1.4.5-2.7.5-3.9 0 .4-1 .7-2.1.9-3.2 1.4.4 2.9.4 4.5-.2.2-.9.5-1.9.8-2.8-2 .8-3.9.9-5.7.3.2-.8.4-1.6.5-2.4C14.2 5 16.5 4.4 19 4c-.3 1.1-.7 2.2-1.1 3.2 1.7-.2 3.3-.7 4.6-1.6-.6 1.9-1.6 3.5-3 4.8 1.1-.1 2.1-.4 3-.9-.8 2-2.2 3.6-4.1 4.7.9.1 1.8 0 2.6-.2-1.2 1.9-3.1 3.2-5.5 3.7-2.5.5-5 .2-7.2-1.1-1.3-.8-2.4-1.9-3.2-3.2.4.1.8.1 1.2.1Z"/>`
  ),
  mern: svg(
    `<circle cx="5.5" cy="12" r="3" fill="#47A248"/><circle cx="12" cy="12" r="3" fill="#61DAFB"/><circle cx="18.5" cy="12" r="3" fill="#68A063"/>`
  ),
  fastapi: svg(
    `<circle cx="12" cy="12" r="10" fill="#009688"/><path fill="#fff" d="m12 5 5.5 12h-3.1L12 10.2 9.6 17H6.5L12 5Z"/>`
  ),
  cpp: svg(
    `<circle cx="12" cy="12" r="10" fill="#00599C"/><text x="12" y="15.6" text-anchor="middle" fill="#fff" font-size="7.5" font-weight="700" font-family="system-ui,sans-serif">C++</text>`
  ),
  html: svg(
    `<path fill="#E44D26" d="M4 2h16l-1.5 17L12 22l-6.5-3L4 2Z"/><path fill="#F16529" d="M12 20.5 17.2 19l1.3-14.5H12v16Z"/><path fill="#EBEBEB" d="M12 9.2H8.7l.2 2.2H12v-2.2Zm0 5.2-.1.1-2.7-.7-.2-1.9H6.7l.3 3.5L12 16.7v-2.3Z"/><path fill="#fff" d="M12 9.2v2.2h3.1l-.3 3.1L12 14.5v2.2l3.9-1.1.5-5.2.1-1.2H12Z"/>`
  ),
  langchain: svg(
    `<circle cx="12" cy="12" r="10" fill="#1C3C3C"/><path fill="#fff" d="M7 12.5c1.2 2 2.8 3 5 3s3.8-1 5-3l-1.5-1c-.8 1.3-1.9 2-3.5 2s-2.7-.7-3.5-2L7 12.5Z"/><circle cx="9" cy="9.5" r="1.2" fill="#C3FA46"/><circle cx="15" cy="9.5" r="1.2" fill="#C3FA46"/>`
  ),
  chroma: svg(
    `<circle cx="12" cy="12" r="10" fill="#FF6F61"/><path fill="#fff" d="M8 14.5c1 1.5 2.4 2.3 4 2.3s3-0.8 4-2.3L14.5 13c-.6.9-1.4 1.3-2.5 1.3s-1.9-.4-2.5-1.3L8 14.5ZM9.5 9a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm5 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>`
  ),
  gemini: svg(
    `<path fill="#8E75B2" d="M12 2c1.8 4.4 5.6 8.2 10 10-4.4 1.8-8.2 5.6-10 10-1.8-4.4-5.6-8.2-10-10C6.4 10.2 10.2 6.4 12 2Z"/>`
  ),
  rag: svg(
    `<rect width="24" height="24" rx="6" fill="#111"/><path fill="#fff44f" d="M7 7h4.2c1.9 0 3.1 1.1 3.1 2.7 0 1.2-.7 2.1-1.8 2.5L15 17h-2.4l-2.2-4.1H9.2V17H7V7Zm2.2 1.8v3h1.8c.9 0 1.4-.5 1.4-1.5s-.5-1.5-1.4-1.5H9.2Z"/>`
  ),
  webflow: svg(
    `<path fill="#4353FF" d="M3 6.5 8.2 17.5h2.1L14.5 7.8l4.2 9.7H21L17.2 6.5h-2.4L12 14.2 9.2 6.5H3Z"/>`
  ),
  n8n: svg(
    `<circle cx="5" cy="12" r="2.3" fill="#EA4B71"/><circle cx="12" cy="6.2" r="2.3" fill="#EA4B71"/><circle cx="12" cy="17.8" r="2.3" fill="#EA4B71"/><circle cx="19" cy="12" r="2.3" fill="#EA4B71"/><path stroke="#EA4B71" stroke-width="1.5" fill="none" d="M7.1 11.2 9.8 7.7M7.1 12.8l2.7 3.5M14.2 7.7l2.7 3.5M14.2 16.3l2.7-3.5"/>`
  ),
  zap: svg(
    `<path fill="#FF6B35" d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"/>`
  ),
  brand: svg(
    `<circle cx="12" cy="12" r="10" fill="#111"/><path fill="#fff44f" d="M8 15.5 12 5.5l4 10h-2.1l-.7-1.9h-2.4l-.7 1.9H8Zm3.1-3.5h1.8L12 8.4l-.9 3.6Z"/>`
  ),
  social: svg(
    `<circle cx="7" cy="8" r="2.4" fill="#fff44f"/><circle cx="17" cy="8" r="2.4" fill="#fff"/><circle cx="12" cy="16" r="2.4" fill="#ff5a1f"/><path stroke="#fff" stroke-width="1.4" fill="none" d="M9 8.8 15 8.8M8.2 9.8 11 14.2M15.8 9.8 13 14.2"/>`
  ),
  network: svg(
    `<circle cx="5" cy="7" r="2.2" fill="#fff"/><circle cx="19" cy="7" r="2.2" fill="#fff44f"/><circle cx="12" cy="17" r="2.2" fill="#ff5a1f"/><path stroke="#fff" stroke-width="1.4" fill="none" d="M7 7.8 17 7.8M6.5 8.8 10.8 15.2M17.5 8.8 13.2 15.2"/>`
  ),
  ui: svg(
    `<rect x="3" y="4" width="18" height="16" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path stroke="currentColor" stroke-width="1.6" d="M3 9h18M9 9v11"/>`
  ),
  interact: svg(
    `<path fill="currentColor" d="M11 3v10.2l2.4-2.3 2.1 5.1 1.9-.8-2.1-5.1H18L11 3Z"/>`
  ),
  mobile: svg(
    `<rect x="7" y="2.5" width="10" height="19" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="18.2" r="1" fill="currentColor"/>`
  ),
};
