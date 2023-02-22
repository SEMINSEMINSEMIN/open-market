export const $ = (selector, root = window.document) => {
    const result = root.querySelector(selector);
    if (!(result instanceof HTMLElement)) return null;
    return result;
};