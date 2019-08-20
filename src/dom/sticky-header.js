import { addClass, removeClass } from "./element-class-manip.js";

/* istanbul ignore next */
function stickyHeader(header, target) {
    const css_sticky = 'sticky';
    var sticky = target.offsetTop + target.clientHeight;
    var timeout;
    window.addEventListener('scroll', function (e) {
        if (timeout) window.cancelAnimationFrame(timeout);
        timeout = window.requestAnimationFrame(function () {
            if (window.pageYOffset >= sticky)
                addClass(header, css_sticky);
            else
                removeClass(header, css_sticky);
        });
    }, false);
}