function initTicks(node) {
    var rangeEl = node;
    node = node.parentElement;
    var i = 0,
        tickWrapper, tickDivs, tickSpan, tempNode,
        rangeMin = Number(rangeEl.attributes['min'].value),
        rangeMax = Number(rangeEl.attributes['max'].value),
        rangeStep = Number(rangeEl.attributes['step'].value),
        rangeOrientation = 'h',
        isRTL = false,
        rangeSteps = (rangeMax - rangeMin) / rangeStep;
    tickWrapper = document.createElement('div');
    tickWrapper.className='tick-wrapper';
    var tickDisplayDiv = document.createElement('div');
    tickDisplayDiv.className='tick-display';
    node.appendChild(tickWrapper);
    tickWrapper.appendChild(tickDisplayDiv);
    for(i=0;i<=rangeSteps;i++){
        var tickLabel = Number(rangeMin + i * rangeStep);
        tickLabel = +(Math.round(tickLabel + "e+2") + "e-2");
        var tickDiv = document.createElement('div');
        tickDiv.className ='tick';
        tickDiv.innerHTML = '<span>' + tickLabel +'</span>';
        tickDisplayDiv.appendChild(tickDiv);
    }
    tickDivs = document.querySelectorAll('div.tick',node);
    if (node.className.indexOf("slider-vertical") !== -1) {
        rangeOrientation = 'v';
    }
    if (node.className.indexOf("slider-rtl") !== -1) {
        isRTL = true;
    }
    for (i = 0; i < tickDivs.length; i++) {
        if (rangeOrientation === 'h') {
            if (!isRTL) {
                tickDivs[i].style.left = i / rangeSteps * 100 + "%";
                tickSpan = tickDivs[i].children[0];
                if (tickSpan.offsetWidth !== 0) {
                    tickSpan.style.left = -1 * (tickSpan.offsetWidth / 2) + "px";
                } else { /* needed when element is set to display:none due to client side expression*/
                    tempNode = document.createElement("span");
                    tempNode.innerHTML = tickSpan.innerHTML;
                    document.body.appendChild(tempNode);
                    tickSpan.style.left = -1 * (tempNode.offsetWidth / 2) + "px";
                    document.body.removeChild(tempNode);
                }
            } else {
                tickDivs[i].style.right = i / rangeSteps * 100 + "%";
                tickSpan = tickDivs[i].children[0];
                if (tickSpan.offsetWidth !== 0) {
                    tickSpan.style.right = -1 * (tickSpan.offsetWidth / 2) + "px";
                } else { /* needed when element is set to display:none due to client side expression*/
                    tempNode = document.createElement("span");
                    tempNode.innerHTML = tickSpan.innerHTML;
                    document.body.appendChild(tempNode);
                    tickSpan.style.right = -1 * (tempNode.offsetWidth / 2) + "px";
                    document.body.removeChild(tempNode);
                }
            }
        } else {
            tickDivs[i].style.top = 100 - (i / rangeSteps * 100) + "%";
        }
    }
    if (rangeOrientation === 'v') {
        //var rangeWidth = Number(rangeEl.offsetWidth);
        //var nodeDims = node.getBoundingClientRect();
        //var rangeElDims = rangeEl.getBoundingClientRect();
        if (!isRTL) {
            //tickWrapper.style.left = rangeElDims.left - nodeDims.left + rangeElDims.width + "px";
            tickWrapper.style.left = window.getComputedStyle(rangeEl).getPropertyValue("height");
        } else {
            //tickWrapper.style.right = nodeDims.right - rangeElDims.right + rangeElDims.width + "px";
            tickWrapper.style.right = window.getComputedStyle(rangeEl).getPropertyValue("height");
        }
        //tickWrapper.style.top = rangeElDims.top - nodeDims.top + "px";
        tickWrapper.style.height = window.getComputedStyle(rangeEl).getPropertyValue("width");
    }
}
var initializeSlider = function() {
    var i, nodes = document.querySelectorAll('input[type="range"]');
    for (i = 0; i < nodes.length; i++) {
        initTicks(nodes[i]);
    }

};
initializeSlider();