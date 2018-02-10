$(".submit").click(()=>{
    let form = $("#form").serializeArray();
    let formObject = JSON.parse(JSON.stringify(form));

    for(let item of formObject){ 
        if(!item.value){
            alert('有欄位沒填寫！');
            return;
        }
    }
    
    $.ajax({
        url: "/login",
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