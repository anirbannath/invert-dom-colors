(function () {

    function init() {
        const filteredElements = findElementsWithColors();
        filteredElements.forEach(meta => {
            meta.element.style.color = produceRGB(invert(extractRGB(meta.color)));
            meta.element.style.backgroundColor = produceRGB(invert(extractRGB(meta.backgroundColor)));
        });
    }

    function findElementsWithColors() {
        const elements = document.querySelectorAll("body, body *");
        const filteredElements = [];
        for (let index = 0; index < elements.length; index++) {
            const element = elements.item(index);
            const styles = window.getComputedStyle(element);
            if (element.nodeType === 1 && (styles.color || styles.backgroundColor)) {
                filteredElements.push({
                    element: element,
                    color: styles.color,
                    backgroundColor: styles.backgroundColor
                });
            }
        }
        return filteredElements;
    }

    function extractRGB(color) {
        const match = color.match(/rgba?\((.*)\)/);
        const rgba = match ? match[1].split(',') : null;
        return rgba ? {
            red: +rgba[0],
            green: +rgba[1],
            blue: +rgba[2],
            alpha: rgba[3] === undefined || isNaN(rgba[3]) ? 1 : +rgba[3]
        } : {};
    }

    function produceRGB(rgbValue) {
        return 'rgba(' + rgbValue.red + ', ' + rgbValue.green + ', ' + rgbValue.blue + ', ' + rgbValue.alpha + ')';
    }

    function invert(rgbValue, total = 255) {
        return {
            red: total - rgbValue.red,
            green: total - rgbValue.green,
            blue: total - rgbValue.blue,
            alpha: rgbValue.alpha
        }
    }

    window.invertColors = {
        init: init
    };

})();