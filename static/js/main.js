function sendRequest(url, method="GET", data={}) {
    $.ajax({
        url: url,
        method: method,
        data: data
    }).then(response=>{
        console.log(response)
    })
}
$(".filters").click(event => {
    let current = $(".active")
    let orderUrl = "api/order/"
    console.log(event.target)
    if(current[0])
        current[0].className = current[0].className.replace("active","");
    $(event.target).addClass("active");
    console.log(event.target.id);
    sendRequest(orderUrl+event.target.id,"GET")
})
