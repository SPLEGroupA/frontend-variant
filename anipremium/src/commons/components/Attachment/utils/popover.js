export const clampToViewport = ({ top, right, width, padding = 8 }) => {
  const w = typeof window !== "undefined" ? window.innerWidth : 1024;

  const left = Math.max(padding, Math.min(right - width, w - width - padding));

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
  };
};
