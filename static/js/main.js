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


$("body").click(event => {
    let current = $(".active", event.target.parentNode)
    if(event.target.nodeName === "BUTTON") {
        if (current[0])
            current[0].className = current[0].className.replace("active", "")
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

    if (event.target.className === "content__sorting-button active") {
        let sortingUrl = "api/order/"+event.target.id
        let test = 123
        let object =
        sendRequest(sortingUrl).then(response => {
            $(".pizza-card").remove()
            response.forEach(function(item, i, response) {
                createPizzaCard(item);
            })
        })
    }
})
