const css_sticky = 'sticky';

/**
 * 
 * @param {HTMLElement} header 
 * @param {HTMLElement} target 
 */
/* istanbul ignore next */
function stickyHeader(header, target) {
    var sticky = target.offsetTop + target.clientHeight;
    var timeout;
    
    window.addEventListener('scroll', function (e) {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }

        timeout = window.requestAnimationFrame(function () {
            if (window.scrollY >= sticky) {
                header.classList.add(css_sticky);
            } else {
                header.classList.remove(css_sticky);
            }
        });
    }, false);
}