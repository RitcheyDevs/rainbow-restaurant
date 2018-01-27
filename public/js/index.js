$(".submit").click(()=>{
    let form = $("#form").serializeArray();
    let formObject = JSON.parse(JSON.stringify(form));

    for(let item of formObject){ 
        if(!item.value){
            alert('有必填欄位沒填寫！');
            return;
        }
    }
    
    $.ajax({
        url: "/reserve",
        method: "POST",
        data: form
    })
    .done(function( res ) {
        $("#form")[0].reset();
        alert(res.message);
    })
    .fail(function( res ) {
        alert(textStatus);
    });

});


$('.link a').click(function(){
    let target = $(this).attr('href').replace('/', '');;
    $("html, body").animate({ scrollTop: $(target).offset().top }, 1000);
});