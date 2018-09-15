Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;


function createEnvImpactElement(options) {
    let el = document.createElement('div');
    el.innerHTML = `
        <div class='fdc-ranking'>
        &#9757; A+  
            <span> by <a href='#'>food costs</a> 
            </span>
        </div>
    `;
    return el;
}

function embedElementOnPage(product) {
    const priceElement = document.getElementsByClassName(
        'sidebar-price-shadow'
    )[0];
    const el = createEnvImpactElement();
    el.appendAfter(priceElement);
}

embedElementOnPage();