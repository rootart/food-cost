Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;


function createEnvImpactElement(options) {
    let el = document.createElement('div');
    el.innerHTML = `
        <div class='fdc-ranking'>
            <b>&#9757; A+  </b>
            <span> by <a href='#'>food costs</a> </span>
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
    showPopup();
    //el.addEventListener('click', showPopup);
}

function showPopup() {
    var modal = new tingle.modal({
        footer: true,
        stickyFooter: false,
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
        onOpen: function() {
            console.log('modal open');
        },
        onClose: function() {
            console.log('modal closed');
        },
        beforeClose: function() {
            // here's goes some logic
            // e.g. save content before closing the modal
            return true; // close the modal
            return false; // nothing happens
        }
    });

    const contentMarkup = `
        <div class="popup-content">
            <h1 class="product-title">here\'s some content</h1>
            <div class="container">
                <div class="big-item item">
                    test
                    <div class="scale">
                    A C
                    </div>
                </div>
                <div class="small-item item">
                    <div class="food-explanation">
                        test 2
                    </div>    
                </div>
            </div>  
        </div> 
    `;

    // set content
    modal.setContent(contentMarkup);

    // add a button
    modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
        // here goes some logic
        modal.close();
    });

    // add another button
    modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
        // here goes some logic
        modal.close();
    });

    modal.open()
}

embedElementOnPage();