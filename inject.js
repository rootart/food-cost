Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;


function createEnvImpactElement(options) {
    let el = document.createElement('div'),
        ranking = _.sample(['B', 'C']);
    el.innerHTML = `
        <div class='fdc-ranking'>
            <b>&#9757; ${ranking}  </b>

                <span>27 - CO2 Kilos Equivalent. by <a href='#'>food costs</a></span>

        </div>
    `;
    return el;
}

function embedElementOnPage(product) {
    const priceElement = document.getElementsByClassName('sidebar-price')[0];
    const el = createEnvImpactElement();
    el.appendAfter(priceElement);

    //showPopup(); // show popup on init
    el.addEventListener('click', showPopup);
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

    const productTitle = document.getElementsByClassName('sidebar-product-name')[0].textContent.trim(),
        img = document.getElementsByClassName('product-stage-slider-image')[0].getAttribute('src'),
        foodExplanation = {
            title: 'Reduce your Carbon Footprint from food',
            list: [
                'Eat locally-produced and organic food',
                'Cut the beef and dairy',
                'Reduce daily portion'
            ],
            title1: 'And you will',
            list1: [
                'reduce pollution',
                'preserve the environment and slow global warming',
                'save you money',
                'improve your health',
                'keep you fit'
            ]
        },
        scaleMarkup = `
        <ul class="scale">
            <li class="item a"></li><li class="item b"></li><li class="item c"></li>
        </ul>
    `,
        contentMarkup = `
        <div class="popup-content">
            <h1 class="product-title">${productTitle}</h1>
            <div class="container">
                
                <div class="big-item item">
                <img src="${img}" width=100/>
                    ${scaleMarkup}
                    <div class="carbon-emission-mark good">
                        <span class="icon">+</span>
                        <span class="text">Good</span>
                    </div>

                    <div class="carbon-emission-mark bad">
                        <span class="icon">&#9747;</span>
                        <span class="text">Bad</span>
                    </div>
                </div>
                <div class="small-item item">
                    <div class="food-explanation">
                        <h2 class="title">${foodExplanation.title}</h2>
                        <ul class="list-checkmarks">
                            <li><i>&#9745;</i> ${foodExplanation.list[0]}</li>
                            <li><i>&#9745;</i> ${foodExplanation.list[1]}</li>
                            <li><i>&#9745;</i> ${foodExplanation.list[2]}</li>
                        </ul>
                        <h3 class="sub-title">${foodExplanation.title1}</h2>
                        <ul class="list-checkmarks sun">
                            <li><i>&#9728;</i> ${foodExplanation.list1[0]}</li>
                            <li><i>&#9728;</i> ${foodExplanation.list1[1]}</li>
                            <li><i>&#9728;</i> ${foodExplanation.list1[2]}</li>
                            <li><i>&#9728;</i> ${foodExplanation.list1[3]}</li>
                            <li><i>&#9728;</i> ${foodExplanation.list1[4]}</li>
                            <li><i>&#9728;</i> ${foodExplanation.list1[5]}</li>
                        </ul>
                    </div>    
                </div>
            </div>  
        </div> 
    `;

    // set content
    modal.setContent(contentMarkup);

    // add a button
    // modal.addFooterBtn('Button label', 'tingle-btn tingle-btn--primary', function() {
    //     // here goes some logic
    //     modal.close();
    // });

    // add another button
    // modal.addFooterBtn('Dangerous action !', 'tingle-btn tingle-btn--danger', function() {
    //     // here goes some logic
    //     modal.close();
    // });

    modal.open()
}

embedElementOnPage();