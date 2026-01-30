import "@testing-library/jest-dom";

const matchMediaMock = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

if (!window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: matchMediaMock,
  });
}

if (!globalThis.matchMedia) {
  globalThis.matchMedia = window.matchMedia;
}
