$(".basket").click(event => {
    if(event.target.parentNode.className === "product__minus") {
        minusOnePizzaInBasket(event)
    }
    if(event.target.parentNode.className === "product__plus") {
        plusOnePizzaInBasket(event)
    }
    if(event.target.parentNode.className === "product__delete") {
        deleteElemInBasket(event)
    }
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
