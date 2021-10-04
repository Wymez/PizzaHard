function sendRequest(url, method="GET", data={}) {
    $.ajax({
        url: url,
        method: method,
        data: data
    }).then(response=>{
        console.log(response)
    })
}
$(".filter").click(event => {
    let current = $(".active")
    if(current[0])
        console.log(current[0].className.replace("active",""))
        current[0].className = current[0].className.replace("active","");
        $(event.target).addClass("active");
})
