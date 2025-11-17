export const wallSvg = `<svg width="240" height="12" viewBox="0 0 240 12" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#888"/>
      <stop offset="50%" stop-color="#666"/>
      <stop offset="100%" stop-color="#555"/>
    </linearGradient>
    <pattern id="brickPattern" patternUnits="userSpaceOnUse" width="40" height="20">
      <rect width="40" height="20" fill="url(#wallGrad)"/>
      <path d="M 0 0 L 40 0 M 0 10 L 40 10 M 0 20 L 40 20" stroke="#777" stroke-width="0.5"/>
      <path d="M 0 0 L 0 20 M 20 0 L 20 20 M 40 0 L 40 20" stroke="#777" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect width="240" height="12" fill="url(#brickPattern)"/>
  <rect width="240" height="2" fill="#999"/>
  <rect y="10" width="240" height="2" fill="#444"/>
  <line x1="0" y1="2" x2="0" y2="10" stroke="#777" stroke-width="1"/>
  <line x1="240" y1="2" x2="240" y2="10" stroke="#777" stroke-width="1"/>
</svg>`;