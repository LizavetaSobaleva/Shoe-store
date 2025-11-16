export const GA_ID = "G-JEZ7F3XKWW";

export const pageview = (path: string) => {
  window.gtag?.("config", GA_ID, { page_path: path });
};

export const trackEvent = (name: string, params: Record<string, any> = {}) => {
  window.gtag?.("event", name, params);
};
