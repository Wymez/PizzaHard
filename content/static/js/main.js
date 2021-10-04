function sendRequest(url, method="GET", data={}) {
    $.ajax({
        url: url,
        method: method,
        data: data
    }).then(response=>{
        console.log(response)
    })
}
$(".filter").on('click', event => {
    let current = $(".active")
    console.log(current);
})
