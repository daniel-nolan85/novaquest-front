// NovaQuest — "Mission Control" palette.
// Dark navy/charcoal base with glowing cyan + amber HUD accents.
export const colors = {
  brand: {
    primary: '#4DEBFF', // cyan — primary accent, CTAs, active states
    secondary: '#FFB020', // amber — secondary accent, highlights, rank-up
    muted: '#12303B', // desaturated cyan-navy for muted brand surfaces
  },
  ui: {
    primary: '#F2FBFF', // near-white, primary icon/border color on dark bg
    secondary: '#8CA3B8', // muted slate-blue for secondary icons/borders
    tertiary: '#141C2B', // panel/card background
    quaternary: '#0A0E17', // deepest background
    disabled: '#2A3441',
    error: '#FF5C5C',
    success: '#34F5A6',
    space: '#B26BFF', // violet accent reserved for rare highlight moments
  },
  bg: {
    primary: '#0A0E17',
    secondary: '#0D1220',
  },
  text: {
    primary: '#F2FBFF',
    secondary: '#8CA3B8',
    disabled: '#4A5A6B',
    inverse: '#F2FBFF',
    error: '#FF5C5C',
    success: '#34F5A6',
  },
  hud: {
    border: 'rgba(77, 235, 255, 0.28)',
    borderStrong: '#4DEBFF',
    borderAmber: 'rgba(255, 176, 32, 0.35)',
    glowCyan: 'rgba(77, 235, 255, 0.35)',
    glowAmber: 'rgba(255, 176, 32, 0.3)',
    grid: 'rgba(77, 235, 255, 0.06)',
  },
};
