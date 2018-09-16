Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling);
}, false;


function createEnvImpactElement(options) {
    let el = document.createElement('div'),
        ranking = _.sample([
            {
                name: 'B',
                co2: '23',
                replacements: [
                    'lentils',
                    'quionoa'
                ]
            },
            {
                name: 'C',
                co2: '39',
                replacements: [
                    'beans',
                    'tofu',
                    'nuts'
                ]
            }
        ]);
    el.innerHTML = `
        <a class="fdc-ranking" href="#">
            <b>&#9757; ${ranking.name}</b>
            <span>
                <span class="rank">${ranking.co2}</span> - CO2 Kilos Equivalent 
                by <span class="link">food costs</span>
            </span>
            <span class="read-more">
                <span class="text">Learn more</span>    
                <svg width="14" height="9" xmlns="http://www.w3.org/2000/svg">
                    <g stroke-width="2" stroke="#f60" fill="none" fill-rule="evenodd" stroke-linecap="round">
                        <path d="M1.5 4.5H12M10 8l2.798-3.5L10 1"></path>
                    </g>
                </svg>
            </span>
    `;
    return {
        el: el,
        ranking: ranking
    };
}

function embedElementOnPage(product) {
    const priceElement = document.getElementsByClassName('sidebar-price')[0],
        data = createEnvImpactElement(),
        el = data['el'],
        ranking = data['ranking'];

    el.appendAfter(priceElement);

    //showPopup(); // show popup on init
    el.addEventListener('click', function () {
        showPopup(ranking)
    });
}

function showPopup(ranking) {
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
                'preserve environment and slow global warming',
                'save you money',
                'improve your health',
                'keep you fit'
            ],
            scaleTitle: 'Product category according to CO2 environment emission impact'
        },
        scaleMarkup = `
            <h2 class="sub-title scale-title">${foodExplanation.scaleTitle}</h2>  
            <ul class="scale">
                <li class="item a"></li><li class="item b"></li><li class="item c"></li>
            </ul>
        `,
        contentMarkup = `
            <div class="popup-content">
                <h1 class="product-title">&#9757; ${productTitle}</h1>
                <div class="container">
                    <div class="big-item item">
                        <img src="${img}" width="200" />
                        <div class="carbon-emission">
                            <div class="carbon-emission-mark bad">
                                <span class="icon">&#9747;</span>
                                <span class="text">
                                    ${ranking.co2} CO<sub>2<sub>
                                </span>
                            </div>
                            <button type="button" class="button-default">Hide products with similiar impact</button>
                        </div>
                        ${scaleMarkup}
                        <div class="replacements">
                            <h2 class="sub-title">Could be replaced with:</h2>
                            <ul>
                            ${
                                ranking.replacements.map((item, index) => {
                                    return (`<li>${item}</li>`);
                                }).join('')
                            }
                            </ul>
                        </div>
                    </div>
                    <div class="small-item item">
                        <div class="food-explanation">
                            <h2 class="title">${foodExplanation.title}</h2>
                            <ul class="list-checkmarks">
                                ${
                                    foodExplanation.list.map((item, index) => {
                                        return (`<li><i>&#9745;</i> ${item}</li>`);
                                    }).join('')
                                }
                            </ul>
                            <h3 class="sub-title">${foodExplanation.title1}</h3>
                            <ul class="list-checkmarks sun">
                                ${
                                    foodExplanation.list1.map((item, index) => {
                                        return (`<li><i>&#9728;</i> ${item}</li>`);
                                    }).join('')
                                }
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