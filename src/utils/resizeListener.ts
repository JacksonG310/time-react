export interface ElementObj extends HTMLElement {
    [key: string]: any;
    resizeListenrs: Function[];
    observer: MutationObserver;
}

export const resizeHandler = (mutationsList: MutationRecord[], observer: any, element: ElementObj) => {
    const listeners = element.resizeListenrs || [];
    if (listeners.length) {
        listeners.forEach((fn: Function) => fn());
    }
}

export const addResizeListener = (element: ElementObj, fn: any) => {
    if (!element.resizeListenrs) {
        element.resizeListenrs = [];
        window.addEventListener('resize', fn);
        const mutationObserverSupported = typeof MutationObserver !== 'undefined';
        if (mutationObserverSupported) {
            element.observer = new MutationObserver((mutationsList, observer) => resizeHandler(mutationsList, observer, element));
            const config = {
                attributes: true,
                childList: true,
                subtree: true,
                characterData: true
            };

            element.observer.observe(element as Node, config);
        }
    }
    element.resizeListenrs.push(fn);
}

export const removeResizeListener = (element: ElementObj, fn: Function) => {
    if (!element || !element.resizeListners) return;
    element.resizeListners.splice(element.resizeListners.indexOf(fn), 1);
    if (!element.resizeListners.length) {
        element.observer.disconnect();
    }
};
