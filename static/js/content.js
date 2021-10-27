import $ from "jquery"

$("body").click(event => {
    let current = $(".active", event.target.parentNode)
    if(event.target.nodeName === "BUTTON" && event.target.closest(".content")) {
        if (current[0])
            current[0].className = current[0].className.replace("active", "")
        if (!event.target.className.includes("click"))
            $(event.target).addClass("active")
    }

    if (event.target.parentNode.className === "pizza-card__size row") {
        let currentObjectUrl = $(".pizza-card__name", event.target.closest(".pizza-card__container"))
        sendRequest("/api/"+currentObjectUrl[0].id)
            .then(response => {
                let elemPrice = $(".pizza-card__price", event.target.closest(".pizza-card__container"))
                if(event.target.innerText === "24 см") {
                    elemPrice[0].innerText = elemPrice[0].innerText.replace(elemPrice[0].innerText.match(/\d+/), response.price)
                }
                if(event.target.innerText === "30 см") {
                    elemPrice[0].innerText = elemPrice[0].innerText.replace(elemPrice[0].innerText.match(/\d+/), response.price*2)
                }
                if(event.target.innerText === "40 см") {
                    elemPrice[0].innerText = elemPrice[0].innerText.replace(elemPrice[0].innerText.match(/\d+/), response.price*3)
                }
            })
    }

    if (event.target.parentNode.className === "content__sorting col-12") {
        let sortingUrl = "api/order/"+event.target.id
        sendRequest(sortingUrl).then(response => {
            $(".pizza-card").remove()

            response.forEach(function(item, i, response) {
                createPizzaCard(item);
            })
        })
    }
    if(event.target.closest(".header__basket-div")) {
        console.log('ok')
        $(".popup").addClass("popup-showed");
        $("body").css('overflow', 'hidden');
        countTotalAmount(event);
    }
    if(event.target.className === "popup__close-img" || event.target.className === "popup popup-showed") {
        let modalWindow = $(".popup")[0]
        if(modalWindow) {
            modalWindow.className = modalWindow.className.replace("popup-showed", "")
            $("body").css('overflow', 'visible');
        }
    }
    if(event.target.parentNode.className === "pizza-card__basket row justify-content-center") {
        if(event.target.innerText === "Добавлено") {
            subtractCounterPizzaCardInBasket()
            changeInCardBasketButtonToOrange(event)
            deletePizzaCardInBasket(event)
        }
        else {
            addCounterPizzaCardInBasket()
            changeInCardBasketButtonToPurple(event)
            addPizzaCardToBasket(event)
        }
        checkOnZeroInBasket();
    }
})
function changeInCardBasketButtonToPurple(event) {
    event.target.innerText = event.target.innerText.replace("В корзину", "Добавлено");
    $(event.target).addClass("pizza-card__basket_added")
}
function changeInCardBasketButtonToOrange(event) {
    event.target.innerText = event.target.innerText.replace("Добавлено", "В корзину");
    event.target.className = event.target.className.replace("pizza-card__basket_added", "");
}

function addCounterPizzaCardInBasket() {
    let amountCounter = $(".header__product-amount")[0];
    amountCounter.value = parseInt(amountCounter.value) + 1;
}
function subtractCounterPizzaCardInBasket() {
    let amountCounter = $(".header__product-amount")[0];
    amountCounter.value = parseInt(amountCounter.value) - 1;
}

function checkOnZeroInBasket() {
    let amountCounter = $(".header__product-amount")[0];
    if(amountCounter.value === "0") {
        amountCounter.style.display = "none"
    }
    else {
        amountCounter.style.display = "inline-block"
    }
}
function addPizzaCardToBasket(event) {
    let pizzaParentElem = $(event.target.closest(".pizza-card__container"));
    let pizzaSize = pizzaParentElem.find(".pizza-card__size").find(".active")[0];
    let pizzaThickness = pizzaParentElem.find(".pizza-card__thickness").find(".active")[0];
    let pizzaName = pizzaParentElem.find(".pizza-card__name")[0];
    let pizzaPrice = pizzaParentElem.find(".pizza-card__price")[0];
    let pizzaImg = pizzaParentElem.find("img")[0];
    console.log(pizzaImg.src);
    let element = `<div class="product">
        <div class="product__thumb">
            <img class="product__img" src=${pizzaImg.src}>
        </div>
        <div class="product__title">
            <a class="product__name" href=${pizzaName.href}>${pizzaName.innerText}</a>
            <div class="product__size">${pizzaSize.innerText}</div>
            <div class="product__thickness">${pizzaThickness.innerText}</div>
        </div>
        <div class="product__plus-minus">
            <span class="product__minus">
                <img
                    src="https://static.tildacdn.com/lib/linea/c8eecd27-9482-6c4f-7896-3eb09f6a1091/arrows_circle_minus.svg"
                    style="width:16px;height:16px;border:0">
            </span>
            <output class="product__quantity">1</output>
            <span class="product__plus">
                <img
                    src="https://static.tildacdn.com/lib/linea/c47d1e0c-6880-dc39-ae34-521197f7fba7/arrows_circle_plus.svg"
                    style="width:16px;height:16px;border:0">
            </span>
        </div>
        <div class="product__amount"> ${pizzaPrice.innerText}</div>
        <div class="product__delete">
            <img
                src="https://static.tildacdn.com/lib/linea/1bec3cd7-e9d1-2879-5880-19b597ef9f1a/arrows_circle_remove.svg"
                style="width:20px;height:20px;border:0;">
        </div>
    </div>`
    $(".basket__products").append(element);
}
function deletePizzaCardInBasket(event) {
    let currentElemUrl = $(event.target.closest(".pizza-card__container")).find(".pizza-card__name")[0].href
    let currentBasketElems = $(".basket").find(".product__name");
    currentBasketElems.each(function(item) {
      if(currentElemUrl === this.href) {
          this.closest(".product").remove()
      }
    })
}
function createPizzaCard(obj) {
    let htmlText = `<div class="pizza-card col-4 py-1">
        <div class="pizza-card__container container h-100 w-100">
            <div class="pizza-card__img row">
                <a class="h-100 w-100" href="${obj.url}">
                    <img src="${obj.image_url}" class="h-100 w-100" alt="">
                </a>
            </div>
            <div class="row"><a class="pizza-card__name" id="${obj.url}"
                                    href="${obj.url}">${obj.name}</a></div>
            <div class="pizza-card__size row">
                <button class="pizza-card__button active col-auto">24 см</button>
                <button class="pizza-card__button col-auto">30 см</button>
                <button class="pizza-card__button col-auto">40 см</button>
            </div>
            <div class="pizza-card__thickness row">
                <button class="pizza-card__button active col-auto">Тонкое</button>
                <button class="pizza-card__button col-auto">Стандартное</button>
            </div>
            <div class="pizza-card__description row">
                ${obj.description}
            </div>
            <div class="pizza-card__price row">${obj.price} руб.</div>
            <div class="pizza-card__basket row justify-content-center">
                <button class="pizza-card__button col-5">В корзину</button>
            </div>
        </div>
    </div>`
    $(".content").append(htmlText);

}
function sendRequest(url, method="GET", data={}) {
    return $.ajax({
        url: url,
        method: method,
        data: data
    })
}
