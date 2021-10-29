import $ from "jquery"

//TODO: если следовать ООП подходу, то я бы реализовал класс OrderBasket c методами
// addItem(item) - добавление позиции в корзину
// deleteItem(item) - удаление позиции из корзины
// Элементы интерфейса будут вызывать методы класса и работать только с ним.
// Внутри экземпляра класса можно хранить все необходимую информацию по заказу. Таким образом можно отделить модель данных
// от внешнего представления

$(".basket").click(event => {
    //TODO: все названия классов вынести в отдельные переменные и работать с этими переменными
    if(event.target.parentNode.className === "product__minus") {
        minusOnePizzaInBasket(event)
    }
    if(event.target.parentNode.className === "product__plus") {
        plusOnePizzaInBasket(event)
    }
    //TODO: содержимое внутри if поместить в отдельную функцию/функции
    if(event.target.parentNode.className === "product__delete") {
        let elemUrl = $(event.target).closest(".product").find(".product__name")[0].href;
        let collectionOfPizzaCards = $("body").find(".pizza-card__name");
        collectionOfPizzaCards.each(function (index) {
            if (this.href === elemUrl) {
                let basketClassname = $(this).closest(".pizza-card__container").find(".pizza-card__basket")[0].children[0];
                basketClassname.className = basketClassname.className.replace("pizza-card__basket_added", "")
                basketClassname.innerText = basketClassname.innerText.replace("Добавлено", "В корзину")
            }
        })
        subtractCounterPizzaCardInBasket()
        deleteElemInBasket(event)
        checkOnZeroInBasket()
    }
    countTotalAmount(event)
})

function plusOnePizzaInBasket(event) {
    let currentQuantity = $(event.target).closest(".product__plus-minus").find(".product__quantity")[0];
    let currentPrice = $(event.target).closest(".product").find(".product__amount")[0]
    currentPrice.innerText = parseInt(currentPrice.innerText.match(/\d+/))+parseInt(currentPrice.innerText.match(/\d+/))/parseInt(currentQuantity.value);
    currentPrice.innerText = currentPrice.innerText + "руб."
    currentQuantity.value = parseInt(currentQuantity.value) + 1;

}
function minusOnePizzaInBasket(event) {
    let currentQuantity = $(event.target).closest(".product__plus-minus").find(".product__quantity")[0];
    let currentPrice = $(event.target).closest(".product").find(".product__amount")[0]
    if(parseInt(currentQuantity.value) >1) {
        currentPrice.innerText = parseInt(currentPrice.innerText.match(/\d+/))-parseInt(currentPrice.innerText.match(/\d+/))/parseInt(currentQuantity.value);
        currentPrice.innerText = currentPrice.innerText + "руб."
        currentQuantity.value = parseInt(currentQuantity.value) - 1;
    }
}

function deleteElemInBasket(event) {
    $(event.target).closest(".product").remove()
}

function countTotalAmount(event) {
    //TODO: на примере этого участка кода можно увидеть проблему. Если вы, например, захотите поменять названия css  классов,
    //  то вам придется менять также код приложения. Получается внутренняя логика приложения зависит от внешнего представления.
    // Это считается плохой практикой, нужно разделать логику и внешнее представление.
    let amountOfEachElem = $(event.currentTarget).find(".product__amount");
    let sumProducts = $(event.currentTarget).find(".basket__total-price")[0]
    let sumTotal = $(event.currentTarget).find(".basket__total-price")[0]
    sumProducts.innerText = "Сумма: 0 руб."
    amountOfEachElem.each(function (index) {
        sumProducts.innerText = "Сумма: " + (parseInt(sumProducts.innerText.match(/\d+/)) + parseInt(this.innerText.match(/\d+/))) + " руб.";
        //TODO: нужно иметь привычку удалять console.log
        console.log(sumProducts.innerText)
    })
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
