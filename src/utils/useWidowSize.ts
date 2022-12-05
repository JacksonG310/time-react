import { throttle } from 'lodash'

export const useWindowSize = () => {
    const htmlEl = document.getElementsByTagName('html')[0];
    const handleResize = () => {
        let windowSize = window && window.document.documentElement.clientWidth;
        let htmlFontSize;
        if (windowSize <= 1040) {
            htmlFontSize = 53;
        } else {
            htmlFontSize = windowSize / 20;
        }
        htmlEl.style.fontSize = htmlFontSize + 'px';
    }
    handleResize();
    window.addEventListener('resize', throttle(handleResize, 500));

}